import mongoose, { Schema, Document } from 'mongoose';

// Singleton document — a single toggle controlling whether the public
// /pricing page shows anything at all.
export interface IPricingSettings extends Document {
  isVisible: boolean;
}

const PricingSettingsSchema = new Schema<IPricingSettings>({
  isVisible: { type: Boolean, default: false },
});

export default mongoose.model<IPricingSettings>('PricingSettings', PricingSettingsSchema);
