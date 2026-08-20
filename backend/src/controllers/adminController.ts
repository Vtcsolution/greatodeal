import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { AuthRequest } from '../middleware/adminAuth';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, rememberMe } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }
    // "Remember me" keeps the session alive for 30 days instead of 1 day, so the
    // admin isn't asked to log in again on the next visit unless they log out.
    const expiresIn = rememberMe ? '30d' : '1d';
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET as string, { expiresIn });
    res.json({ success: true, token, admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login error', error });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    if (!admin) { res.status(404).json({ success: false, message: 'Admin not found' }); return; }
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile', error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) { res.status(404).json({ success: false, message: 'Admin not found' }); return; }
    if (req.body.email) admin.email = req.body.email;
    if (req.body.name) admin.name = req.body.name;
    if (req.body.password) admin.password = req.body.password;
    await admin.save();
    res.json({ success: true, message: 'Profile updated', data: { email: admin.email, name: admin.name } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error });
  }
};

export const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const Blog = (await import('../models/Blog')).default;
    const Contact = (await import('../models/ContactModel')).default;
    const Chat = (await import('../models/ChatModel')).default;
    const Partnership = (await import('../models/PartnershipModel')).default;
    const [blogs, contacts, chats, partnerships] = await Promise.all([
      Blog.countDocuments(),
      Contact.countDocuments(),
      Chat.countDocuments(),
      Partnership.countDocuments(),
    ]);
    res.json({ success: true, data: { blogs, contacts, chats, partnerships } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats', error });
  }
};

export const getBusinessOverview = async (_req: Request, res: Response): Promise<void> => {
  try {
    const Contact = (await import('../models/ContactModel')).default;
    const EmailLog = (await import('../models/EmailLog')).default;
    const Project = (await import('../models/Project')).default;

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      newLeads,
      repliedLeads,
      closedDeals,
      byLeadStatus,
      bySource,
      totalEmailsSent,
      totalOpened,
      revenueAgg,
      monthlyRevenue,
      yearlyRevenue,
      topProjects,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Contact.countDocuments({ status: 'replied' }),
      Contact.countDocuments({ dealClosed: true }),
      Contact.aggregate([{ $group: { _id: '$leadStatus', count: { $sum: 1 } } }]),
      Contact.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }]),
      EmailLog.countDocuments({ status: 'sent' }),
      EmailLog.countDocuments({ opened: true }),
      Project.aggregate([
        {
          $project: {
            budget: 1,
            amountPaidByClient: 1,
            expensesTotal: { $sum: '$expenses.amount' },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$budget' },
            totalCollected: { $sum: '$amountPaidByClient' },
            totalExpenses: { $sum: '$expensesTotal' },
          },
        },
      ]),
      Project.aggregate([
        { $match: { startDate: { $gte: twelveMonthsAgo } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$startDate' } }, revenue: { $sum: '$budget' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Project.aggregate([
        { $group: { _id: { $year: '$startDate' }, revenue: { $sum: '$budget' }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Project.find().sort({ budget: -1 }).limit(5).select('projectName clientName budget currency status startDate'),
    ]);

    const revenue = revenueAgg[0] || { totalRevenue: 0, totalCollected: 0, totalExpenses: 0 };
    const totalRevenue = revenue.totalRevenue || 0;
    const totalCollected = revenue.totalCollected || 0;
    const totalExpenses = revenue.totalExpenses || 0;

    // Fill in months with zero revenue so the chart has a continuous 12-month axis
    const monthMap = new Map(monthlyRevenue.map((m: any) => [m._id, m]));
    const filledMonths = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(twelveMonthsAgo);
      d.setMonth(d.getMonth() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const entry: any = monthMap.get(key);
      filledMonths.push({ month: key, revenue: entry?.revenue || 0, count: entry?.count || 0 });
    }

    res.json({
      success: true,
      data: {
        leads: {
          total: totalLeads,
          new: newLeads,
          replied: repliedLeads,
          closedDeals,
          byStatus: byLeadStatus.map((s: any) => ({ status: s._id, count: s.count })),
          bySource: bySource.map((s: any) => ({ source: s._id, count: s.count })),
        },
        emails: {
          sent: totalEmailsSent,
          opened: totalOpened,
          openRate: totalEmailsSent ? Math.round((totalOpened / totalEmailsSent) * 100) : 0,
        },
        revenue: {
          totalRevenue,
          totalCollected,
          totalOutstanding: Math.max(totalRevenue - totalCollected, 0),
          totalExpenses,
          netProfit: totalRevenue - totalExpenses,
          monthly: filledMonths,
          yearly: yearlyRevenue.map((y: any) => ({ year: y._id, revenue: y.revenue, count: y.count })),
        },
        topProjects,
      },
    });
  } catch (error) {
    console.error('getBusinessOverview error:', error);
    res.status(500).json({ success: false, message: 'Error fetching business overview', error });
  }
};
