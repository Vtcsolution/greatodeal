import mongoose, { Schema, Document } from 'mongoose';

export interface IPageVisit extends Document {
  sessionId: string;
  path: string;
  referrer: string;
  country: string;
  countryCode: string;
  city: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  duration: number;
  scrollDepth: number;
  createdAt: Date;
  updatedAt: Date;
}

const PageVisitSchema = new Schema<IPageVisit>(
  {
    sessionId: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    referrer: { type: String, default: '' },
    country: { type: String, default: 'Unknown', index: true },
    countryCode: { type: String, default: 'XX' },
    city: { type: String, default: '' },
    device: { type: String, enum: ['desktop', 'mobile', 'tablet'], default: 'desktop', index: true },
    browser: { type: String, default: 'Unknown' },
    os: { type: String, default: 'Unknown' },
    duration: { type: Number, default: 0 },
    scrollDepth: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PageVisitSchema.index({ createdAt: -1 });

export default mongoose.model<IPageVisit>('PageVisit', PageVisitSchema);
