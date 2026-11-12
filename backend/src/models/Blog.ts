import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  fullContent: string;
  category: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: Date;
  readTime: string;
  views: number;
  image: string;
  backlinks: Array<{ text: string; url: string }>;
  featured: boolean;
  trending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    // URL-friendly identifier used in public blog URLs (/blog/<slug>). Generated
    // from the title on first save and never changed afterwards, so published
    // links and search rankings stay stable even if the title is edited.
    slug: { type: String, unique: true, sparse: true, index: true },
    excerpt: { type: String, required: true },
    fullContent: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Artificial Intelligence',
        'Blockchain',
        'Data Science and Analytics',
        'Enterprise',
        'Industry',
        'Software Development',
        'Technology',
        'UI/UX Design',
      ],
      required: true,
    },
    author: { type: String, required: true },
    authorBio: { type: String },
    authorImage: { type: String },
    date: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 min read' },
    views: { type: Number, default: 0 },
    image: { type: String, required: true },
    backlinks: [{ text: String, url: String }],
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BlogSchema.index({ category: 1, featured: 1, trending: 1 });

// Words that make a truncated slug read as cut off mid-sentence.
const TRAILING_FILLER = new Set(['a', 'an', 'and', 'are', 'at', 'by', 'for', 'from', 'how', 'in', 'is', 'of', 'on', 'or', 'should', 'the', 'to', 'what', 'with', 'without', 'you', 'your']);

export function slugify(text: string): string {
  const words = text
    .toLowerCase()
    .replace(/['’]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  const kept: string[] = [];
  for (const w of words) {
    if ([...kept, w].join('-').length > 70) break;
    kept.push(w);
  }
  while (kept.length > 3 && TRAILING_FILLER.has(kept[kept.length - 1])) kept.pop();
  return kept.join('-') || 'post';
}

async function uniqueSlug(title: string, excludeId?: unknown): Promise<string> {
  const base = slugify(title);
  let candidate = base;
  for (let n = 2; await Blog.exists({ slug: candidate, _id: { $ne: excludeId } }); n++) {
    candidate = `${base}-${n}`;
  }
  return candidate;
}

BlogSchema.pre('validate', async function () {
  if (!this.slug && this.title) this.slug = await uniqueSlug(this.title, this._id);
});

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

/** Backfills slugs for posts created before slugs existed. Safe to run on every startup. */
export async function ensureBlogSlugs(): Promise<void> {
  const missing = await Blog.find({ $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }] }).select('_id title');
  for (const blog of missing) {
    await Blog.updateOne({ _id: blog._id }, { $set: { slug: await uniqueSlug(blog.title, blog._id) } });
  }
  if (missing.length) console.log(`🔗 Generated slugs for ${missing.length} blog post(s)`);
}

export default Blog;
