import mongoose, { Schema, Document } from 'mongoose';

export interface ILinkedInContact extends Document {
  name: string;
  position?: string;
  company?: string;
  profileUrl?: string;
  lastMessageAt: Date;
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
  },
  { timestamps: true }
);

export default mongoose.model<ILinkedInContact>('LinkedInContact', LinkedInContactSchema);
