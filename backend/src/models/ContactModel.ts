import mongoose, { Schema, Document } from 'mongoose';

export type LeadStatus = 'cold' | 'warm' | 'urgent';

export interface IContact extends Document {
  fullName: string;
  company?: string;
  phone?: string;
  email: string;
  services: string;
  message: string;
  status: 'new' | 'replied';
  repliedAt?: Date;
  createdAt: Date;

  // Lead automation fields
  leadStatus: LeadStatus;
  followUpEnabled: boolean;
  followUpStage: number;
  nextFollowUpAt?: Date | null;
  lastFollowUpAt?: Date | null;
  unsubscribed: boolean;

  // Open/engagement tracking (aggregate, mirrors latest EmailLog stats)
  emailOpens: number;
  lastOpenedAt?: Date | null;
  lastEmailSentAt?: Date | null;

  // Where this contact came from
  source: 'contact_form' | 'lead_finder';
  website?: string;
  address?: string;
}

const ContactSchema = new Schema<IContact>({
  fullName: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  services: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'replied'], default: 'new' },
  repliedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },

  leadStatus: { type: String, enum: ['cold', 'warm', 'urgent'], default: 'cold', index: true },
  followUpEnabled: { type: Boolean, default: true },
  followUpStage: { type: Number, default: 0 },
  nextFollowUpAt: { type: Date, default: null, index: true },
  lastFollowUpAt: { type: Date, default: null },
  unsubscribed: { type: Boolean, default: false },

  emailOpens: { type: Number, default: 0 },
  lastOpenedAt: { type: Date, default: null },
  lastEmailSentAt: { type: Date, default: null },

  source: { type: String, enum: ['contact_form', 'lead_finder'], default: 'contact_form' },
  website: { type: String },
  address: { type: String },
});

export default mongoose.model<IContact>('Contact', ContactSchema);
