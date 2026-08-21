import { Request, Response } from 'express';
import MailMessage, { MailFolder } from '../models/MailMessage';
import EmailLog from '../models/EmailLog';

const FOLDERS: MailFolder[] = ['inbox', 'sent', 'spam', 'trash'];

const normalizeMessageId = (id?: string | null): string => (id || '').replace(/[<>]/g, '').trim();

// Joins Sent-folder messages against EmailLog by Message-ID so the Mailbox
// view can show which sent emails actually came from the website (vs. sent
// by hand through Hostinger webmail) and whether they've been opened.
async function attachTrackingInfo(messages: Array<Record<string, any>>) {
  const wanted = new Set(messages.map(m => normalizeMessageId(m.messageId)).filter(Boolean));
  if (wanted.size === 0) return messages.map(m => ({ ...m, tracked: false }));

  const logs = await EmailLog.find({ messageId: { $exists: true, $ne: null } })
    .select('messageId opened openCount lastOpenedAt')
    .sort({ createdAt: -1 })
    .limit(1000)
    .lean();

  const logMap = new Map(logs.map(l => [normalizeMessageId(l.messageId), l]));

  return messages.map(m => {
    const log = logMap.get(normalizeMessageId(m.messageId));
    return {
      ...m,
      tracked: !!log,
      opened: log?.opened || false,
      openCount: log?.openCount || 0,
      lastOpenedAt: log?.lastOpenedAt || null,
    };
  });
}

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

    const [rawMessages, total] = await Promise.all([
      MailMessage.find(filter)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-htmlBody -textBody')
        .lean(),
      MailMessage.countDocuments(filter),
    ]);

    let messages: Array<Record<string, any>> = rawMessages;
    let stats: { totalSent: number; totalOpened: number } | undefined;

    if (folder === 'sent') {
      messages = await attachTrackingInfo(rawMessages);
      const [totalSent, totalOpened] = await Promise.all([
        EmailLog.countDocuments({ status: 'sent' }),
        EmailLog.countDocuments({ status: 'sent', opened: true }),
      ]);
      stats = { totalSent, totalOpened };
    }

    res.json({ success: true, data: messages, total, page, limit, stats });
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
    let data: Record<string, any> = message.toObject();
    if (message.folder === 'sent') {
      [data] = await attachTrackingInfo([data]);
    }
    res.json({ success: true, data });
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
