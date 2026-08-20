import { Response } from 'express';
import Notification from '../models/Notification';
import { AuthRequest } from '../middleware/adminAuth';

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(limit);
    const unreadCount = await Notification.countDocuments({ read: false });
    res.json({ success: true, data: notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notifications', error });
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating notification', error });
  }
};

export const markAllNotificationsRead = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating notifications', error });
  }
};
