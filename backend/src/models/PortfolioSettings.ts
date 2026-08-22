import mongoose, { Schema, Document } from 'mongoose';

// Singleton document — a single toggle controlling whether the public
// /portfolio page shows any projects at all.
export interface IPortfolioSettings extends Document {
  isVisible: boolean;
}

const PortfolioSettingsSchema = new Schema<IPortfolioSettings>({
  isVisible: { type: Boolean, default: false },
});

export default mongoose.model<IPortfolioSettings>('PortfolioSettings', PortfolioSettingsSchema);
