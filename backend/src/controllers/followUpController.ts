import { Request, Response } from 'express';
import FollowUpTemplate from '../models/FollowUpTemplate';
import EmailLog from '../models/EmailLog';
import { runFollowUpCycle } from '../services/followUpEngine';

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
