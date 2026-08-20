import { Request, Response } from 'express';
import FollowUpTemplate from '../models/FollowUpTemplate';
import EmailLog from '../models/EmailLog';
import Contact from '../models/ContactModel';
import { runFollowUpCycle } from '../services/followUpEngine';

/**
 * Leads that have been emailed but haven't replied or closed — grouped by
 * how many days it's been since they were last contacted, so the admin can
 * see at a glance who's overdue for a manual nudge (Day 1, Day 2, Day 3…).
 * This is a review/visibility list for a human, separate from the automated
 * cron which sends on its own schedule regardless of anyone looking at this.
 */
export const getFollowUpReminders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find({
      status: { $ne: 'replied' },
      dealClosed: { $ne: true },
      unsubscribed: { $ne: true },
      lastEmailSentAt: { $ne: null },
    }).sort({ lastEmailSentAt: 1 });

    const now = Date.now();
    const withDays = contacts.map((c) => ({
      _id: c._id,
      fullName: c.fullName,
      company: c.company,
      email: c.email,
      leadStatus: c.leadStatus,
      emailOpens: c.emailOpens,
      lastOpenedAt: c.lastOpenedAt,
      lastEmailSentAt: c.lastEmailSentAt,
      followUpStage: c.followUpStage,
      daysSinceLastEmail: Math.max(0, Math.floor((now - new Date(c.lastEmailSentAt as Date).getTime()) / (1000 * 60 * 60 * 24))),
    }));

    res.json({ success: true, data: withDays });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching follow-up reminders', error });
  }
};

export const getTemplates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const templates = await FollowUpTemplate.find().sort({ leadStatus: 1, stage: 1 });
    res.json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching templates', error });
  }
};

export const upsertTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leadStatus, stage, delayHours, subject, body, active } = req.body;
    const template = await FollowUpTemplate.findOneAndUpdate(
      { leadStatus, stage },
      { leadStatus, stage, delayHours, subject, body, active: active !== false },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving template', error });
  }
};

export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    await FollowUpTemplate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting template', error });
  }
};

export const getEmailLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contactId } = req.query;
    const filter: Record<string, unknown> = {};
    if (contactId) filter.contactId = contactId;
    const logs = await EmailLog.find(filter).sort({ createdAt: -1 }).limit(200).select('-html');
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching email logs', error });
  }
};

export const triggerFollowUpCycle = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await runFollowUpCycle();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error running follow-up cycle', error });
  }
};
