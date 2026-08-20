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
