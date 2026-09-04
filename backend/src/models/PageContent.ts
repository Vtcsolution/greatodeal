import mongoose, { Schema, Document } from 'mongoose';

export interface IPageContent extends Document {
  page: string;
  fields: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    page: { type: String, required: true, unique: true },
    fields: { type: Map, of: String, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IPageContent>('PageContent', PageContentSchema);
