import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioProject extends Document {
  title: string;
  description: string;
  images: string[];
  category?: string;
  projectUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    category: { type: String },
    projectUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolioProject>('PortfolioProject', PortfolioProjectSchema);
