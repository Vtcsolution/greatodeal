import mongoose, { Schema, Document, Types } from 'mongoose';

export type NotificationType =
  | 'new_lead'
  | 'email_opened'
  | 'email_replied'
  | 'followup_sent'
  | 'new_mail'
  | 'partnership_lead';

export interface INotification extends Document {
  type: NotificationType;
  title: string;
  message: string;
  contactId?: Types.ObjectId;
  meta?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  type: {
    type: String,
    enum: ['new_lead', 'email_opened', 'email_replied', 'followup_sent', 'new_mail', 'partnership_lead'],
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact' },
  meta: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now, index: true },
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
