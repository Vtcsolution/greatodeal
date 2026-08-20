import mongoose, { Schema, Document, Types } from 'mongoose';

export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
export type MilestoneStatus = 'pending' | 'in_progress' | 'done';
export type ExpenseCategory = 'development' | 'api' | 'tool' | 'other';

export interface IFeature {
  name: string;
  done: boolean;
}

export interface IMilestone {
  title: string;
  startDate?: Date | null;
  endDate?: Date | null;
  status: MilestoneStatus;
  amount: number;
}

export interface IExpense {
  label: string;
  category: ExpenseCategory;
  amount: number;
  date: Date;
}

export interface IProject extends Document {
  contactId: Types.ObjectId;
  clientName: string;
  clientEmail: string;
  company?: string;

  projectName: string;
  projectType: string;
  description?: string;
  status: ProjectStatus;

  startDate: Date;
  targetEndDate?: Date | null;
  completedAt?: Date | null;

  budget: number;
  amountPaidByClient: number;
  currency: string;

  features: IFeature[];
  milestones: IMilestone[];
  expenses: IExpense[];

  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>(
  { name: { type: String, required: true }, done: { type: Boolean, default: false } },
  { _id: true }
);

const MilestoneSchema = new Schema<IMilestone>(
  {
    title: { type: String, required: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    status: { type: String, enum: ['pending', 'in_progress', 'done'], default: 'pending' },
    amount: { type: Number, default: 0 },
  },
  { _id: true }
);

const ExpenseSchema = new Schema<IExpense>(
  {
    label: { type: String, required: true },
    category: { type: String, enum: ['development', 'api', 'tool', 'other'], default: 'other' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const ProjectSchema = new Schema<IProject>(
  {
    contactId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true, index: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    company: { type: String },

    projectName: { type: String, required: true },
    projectType: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled'], default: 'planning', index: true },

    startDate: { type: Date, default: Date.now },
    targetEndDate: { type: Date, default: null },
    completedAt: { type: Date, default: null },

    budget: { type: Number, default: 0 },
    amountPaidByClient: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },

    features: { type: [FeatureSchema], default: [] },
    milestones: { type: [MilestoneSchema], default: [] },
    expenses: { type: [ExpenseSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
