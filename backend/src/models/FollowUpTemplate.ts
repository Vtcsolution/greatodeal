import mongoose, { Schema, Document } from 'mongoose';

export interface IFollowUpTemplate extends Document {
  leadStatus: 'cold' | 'warm' | 'urgent';
  stage: number; // 0 = first follow-up after initial contact, 1 = second, ...
  delayHours: number; // hours after previous stage (or after createdAt for stage 0) to send
  subject: string;
  body: string; // supports {{fullName}}, {{company}}, {{services}}, {{email}}
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FollowUpTemplateSchema = new Schema<IFollowUpTemplate>(
  {
    leadStatus: { type: String, enum: ['cold', 'warm', 'urgent'], required: true, index: true },
    stage: { type: Number, required: true },
    delayHours: { type: Number, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

FollowUpTemplateSchema.index({ leadStatus: 1, stage: 1 }, { unique: true });

export default mongoose.model<IFollowUpTemplate>('FollowUpTemplate', FollowUpTemplateSchema);
