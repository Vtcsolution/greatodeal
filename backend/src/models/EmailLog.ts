import mongoose, { Schema, Document, Types } from 'mongoose';

export type EmailLogType = 'manual_reply' | 'auto_followup' | 'contact_notification';

export interface IEmailOpenEvent {
  ip?: string;
  userAgent?: string;
  openedAt: Date;
}

export interface IEmailLog extends Document {
  contactId?: Types.ObjectId;
  trackingId: string;
  type: EmailLogType;
  to: string;
  subject: string;
  html: string;
  followUpStage?: number;
  status: 'sent' | 'failed';
  error?: string;
  opened: boolean;
  openCount: number;
  firstOpenedAt?: Date | null;
  lastOpenedAt?: Date | null;
  opens: IEmailOpenEvent[];
  messageId?: string;
  createdAt: Date;
}

const EmailOpenEventSchema = new Schema<IEmailOpenEvent>(
  {
    ip: String,
    userAgent: String,
    openedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const EmailLogSchema = new Schema<IEmailLog>({
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact', index: true },
  trackingId: { type: String, required: true, unique: true, index: true },
  type: { type: String, enum: ['manual_reply', 'auto_followup', 'contact_notification'], required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  html: { type: String, required: true },
  followUpStage: { type: Number },
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
  error: { type: String },
  opened: { type: Boolean, default: false },
  openCount: { type: Number, default: 0 },
  firstOpenedAt: { type: Date, default: null },
  lastOpenedAt: { type: Date, default: null },
  opens: { type: [EmailOpenEventSchema], default: [] },
  messageId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEmailLog>('EmailLog', EmailLogSchema);
