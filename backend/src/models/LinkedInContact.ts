import mongoose, { Schema, Document } from 'mongoose';

export interface ILinkedInContact extends Document {
  name: string;
  position?: string;
  company?: string;
  profileUrl?: string;
  lastMessageAt: Date;
  interestScore?: number;
  interestNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LinkedInContactSchema = new Schema<ILinkedInContact>(
  {
    name: { type: String, required: true },
    position: { type: String },
    company: { type: String },
    profileUrl: { type: String },
    lastMessageAt: { type: Date, default: Date.now },
    // AI's read on how likely this contact is to close as a client, 0-100,
    // re-scored on every generated reply so it always reflects the latest
    // conversation state.
    interestScore: { type: Number, min: 0, max: 100 },
    interestNote: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ILinkedInContact>('LinkedInContact', LinkedInContactSchema);
