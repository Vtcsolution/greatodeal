import mongoose, { Schema, Document, Types } from 'mongoose';

export type MailFolder = 'inbox' | 'sent' | 'spam' | 'trash';

export interface IMailMessage extends Document {
  folder: MailFolder;
  uid?: number;
  messageId?: string;
  inReplyTo?: string;
  from: string;
  fromName?: string;
  to: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
  date: Date;
  read: boolean;
  contactId?: Types.ObjectId;
  createdAt: Date;
}

const MailMessageSchema = new Schema<IMailMessage>({
  folder: { type: String, enum: ['inbox', 'sent', 'spam', 'trash'], required: true, index: true },
  uid: { type: Number },
  messageId: { type: String, index: true },
  inReplyTo: { type: String },
  from: { type: String, required: true },
  fromName: { type: String },
  to: { type: String },
  subject: { type: String, default: '(no subject)' },
  textBody: { type: String },
  htmlBody: { type: String },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact', index: true },
  createdAt: { type: Date, default: Date.now },
});

MailMessageSchema.index({ folder: 1, uid: 1 }, { unique: false });

export default mongoose.model<IMailMessage>('MailMessage', MailMessageSchema);
