import mongoose, { Schema, Document } from 'mongoose';

export type LinkedInStage = 'trust' | 'understand' | 'propose' | 'closing';
export type LinkedInStatus = 'active' | 'won' | 'lost';

export interface ILinkedInContact extends Document {
  name: string;
  position?: string;
  company?: string;
  profileUrl?: string;
  lastMessageAt: Date;
  interestScore?: number;
  interestNote?: string;
  stage?: LinkedInStage;
  status: LinkedInStatus;
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
    // Which stage of the trust -> understand -> propose -> closing
    // methodology the AI thinks this conversation is currently in.
    stage: { type: String, enum: ['trust', 'understand', 'propose', 'closing'] },
    // Manually set by the admin once a conversation resolves either way.
    status: { type: String, enum: ['active', 'won', 'lost'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.model<ILinkedInContact>('LinkedInContact', LinkedInContactSchema);
