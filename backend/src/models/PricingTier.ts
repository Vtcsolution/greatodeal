import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingTier extends Document {
  title: string;
  badge?: string;
  description: string;
  currency: string;
  price: string;
  priceSuffix?: string;
  features: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PricingTierSchema = new Schema<IPricingTier>(
  {
    title: { type: String, required: true },
    badge: { type: String },
    description: { type: String, required: true },
    currency: { type: String, default: '$' },
    price: { type: String, required: true },
    priceSuffix: { type: String },
    features: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPricingTier>('PricingTier', PricingTierSchema);
