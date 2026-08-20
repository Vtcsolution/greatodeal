import mongoose, { Schema, Document } from 'mongoose';

// Tracks the last IMAP UID processed per folder so polling survives a
// server restart instead of losing its place and re-treating everything
// as "new" (or, as before, silently skipping all of it).
export interface IMailboxState extends Document {
  folder: string;
  lastUid: number;
  updatedAt: Date;
}

const MailboxStateSchema = new Schema<IMailboxState>(
  {
    folder: { type: String, required: true, unique: true },
    lastUid: { type: Number, required: true, default: 0 },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export default mongoose.model<IMailboxState>('MailboxState', MailboxStateSchema);
