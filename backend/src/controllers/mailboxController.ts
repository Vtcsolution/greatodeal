import { Request, Response } from 'express';
import MailMessage, { MailFolder } from '../models/MailMessage';

const FOLDERS: MailFolder[] = ['inbox', 'sent', 'spam', 'trash'];

export const getFolderCounts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const counts: Record<string, { total: number; unread: number }> = {};
    for (const folder of FOLDERS) {
      const [total, unread] = await Promise.all([
        MailMessage.countDocuments({ folder }),
        MailMessage.countDocuments({ folder, read: false }),
      ]);
      counts[folder] = { total, unread };
    }
    res.json({ success: true, data: counts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching folder counts', error });
  }
};

export const getFolderMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const folder = req.params.folder as MailFolder;
    if (!FOLDERS.includes(folder)) {
      res.status(400).json({ success: false, message: 'Invalid folder' });
      return;
    }
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 25, 100);
    const search = (req.query.search as string) || '';

    const filter: Record<string, unknown> = { folder };
    if (search) {
      filter.$or = [
        { subject: new RegExp(search, 'i') },
        { from: new RegExp(search, 'i') },
        { fromName: new RegExp(search, 'i') },
      ];
    }

    const [messages, total] = await Promise.all([
      MailMessage.find(filter)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-htmlBody -textBody'),
      MailMessage.countDocuments(filter),
    ]);

    res.json({ success: true, data: messages, total, page, limit });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching messages', error });
  }
};

export const getMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await MailMessage.findById(req.params.id);
    if (!message) { res.status(404).json({ success: false, message: 'Message not found' }); return; }
    if (!message.read) {
      message.read = true;
      await message.save();
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching message', error });
  }
};

export const moveMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { folder } = req.body as { folder: MailFolder };
    if (!FOLDERS.includes(folder)) {
      res.status(400).json({ success: false, message: 'Invalid folder' });
      return;
    }
    const message = await MailMessage.findByIdAndUpdate(req.params.id, { folder }, { new: true });
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error moving message', error });
  }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    await MailMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting message', error });
  }
};
