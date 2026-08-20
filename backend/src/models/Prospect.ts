import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProspect extends Document {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  ratingCount: number;
  businessStatus: string;
  email: string | null;
  hasLinkedIn: boolean;
  sizeTier: 'small' | 'growing' | 'established' | 'large';
  activity: 'active' | 'quiet' | 'unknown';
  lastReviewDate: Date | null;
  keyword: string;
  location: string;
  imported: boolean;
  importedContactId?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProspectSchema = new Schema<IProspect>(
  {
    placeId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    rating: { type: Number, default: null },
    ratingCount: { type: Number, default: 0 },
    businessStatus: { type: String, default: 'OPERATIONAL' },
    email: { type: String, default: null },
    hasLinkedIn: { type: Boolean, default: false },
    sizeTier: { type: String, enum: ['small', 'growing', 'established', 'large'], default: 'small' },
    activity: { type: String, enum: ['active', 'quiet', 'unknown'], default: 'unknown' },
    lastReviewDate: { type: Date, default: null },
    keyword: { type: String, default: '' },
    location: { type: String, default: '' },
    imported: { type: Boolean, default: false, index: true },
    importedContactId: { type: Schema.Types.ObjectId, ref: 'Contact', default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IProspect>('Prospect', ProspectSchema);
