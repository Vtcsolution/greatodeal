import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioFeature {
  title: string;
  description: string;
}

export interface IPortfolioProject extends Document {
  title: string;
  subtitle?: string;
  description: string; // "Project Overview" body
  strategicImpact?: string;
  images: string[];
  category?: string;
  year?: string;
  status: 'active' | 'inactive';
  techStack: string[];
  keyFeatures: IPortfolioFeature[];
  projectUrl?: string; // "Demo URL"
  videoUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioFeatureSchema = new Schema<IPortfolioFeature>(
  { title: { type: String, required: true }, description: { type: String, default: '' } },
  { _id: false }
);

const PortfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    strategicImpact: { type: String },
    images: { type: [String], default: [] },
    category: { type: String },
    year: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    techStack: { type: [String], default: [] },
    keyFeatures: { type: [PortfolioFeatureSchema], default: [] },
    projectUrl: { type: String },
    videoUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolioProject>('PortfolioProject', PortfolioProjectSchema);
