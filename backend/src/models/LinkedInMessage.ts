import mongoose, { Schema, Document, Types } from 'mongoose';

export type LinkedInMessageRole = 'me' | 'them';

export interface ILinkedInMessage extends Document {
  contactId: Types.ObjectId;
  role: LinkedInMessageRole;
  content: string;
  createdAt: Date;
}

const LinkedInMessageSchema = new Schema<ILinkedInMessage>({
  contactId: { type: Schema.Types.ObjectId, ref: 'LinkedInContact', required: true, index: true },
  role: { type: String, enum: ['me', 'them'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILinkedInMessage>('LinkedInMessage', LinkedInMessageSchema);
