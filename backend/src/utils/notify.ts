import Notification, { NotificationType } from '../models/Notification';
import { emitToAdmins } from './socket';
import { Types } from 'mongoose';

export const notify = async (
  type: NotificationType,
  title: string,
  message: string,
  contactId?: Types.ObjectId | string,
  meta?: Record<string, unknown>
): Promise<void> => {
  try {
    const doc = await Notification.create({ type, title, message, contactId, meta });
    emitToAdmins('notification', {
      _id: doc._id,
      type: doc.type,
      title: doc.title,
      message: doc.message,
      contactId: doc.contactId,
      meta: doc.meta,
      read: doc.read,
      createdAt: doc.createdAt,
    });
  } catch (err) {
    console.error('notify() error:', err);
  }
};
