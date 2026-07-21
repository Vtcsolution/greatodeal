import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const imageFile = files?.image?.[0];
    const authorImageFile = files?.authorImage?.[0];
    const blogData = {
      ...req.body,
      image: imageFile ? `/uploads/blogs/${imageFile.filename}` : req.body.image,
      authorImage: authorImageFile ? `/uploads/authors/${authorImageFile.filename}` : req.body.authorImage,
    };
    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('createBlog error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error creating blog' });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, featured, trending, page = 1, limit = 10 } = req.query;
    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (trending === 'true') filter.trending = true;
    const skip = (Number(page) - 1) * Number(limit);
    const [blogs, total] = await Promise.all([
      Blog.find(filter).select('-fullContent').sort({ date: -1 }).skip(skip).limit(Number(limit)),
      Blog.countDocuments(filter),
    ]);
    res.json({ success: true, data: blogs, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    console.error('getBlogs error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error fetching blogs' });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    if (!blog) { res.status(404).json({ success: false, message: 'Blog not found' }); return; }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('getBlogById error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error fetching blog' });
  }
};

export const getBlogByIdAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) { res.status(404).json({ success: false, message: 'Blog not found' }); return; }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('getBlogByIdAdmin error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error fetching blog' });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updateData: Record<string, unknown> = { ...req.body };
    if (files?.image?.[0]) updateData.image = `/uploads/blogs/${files.image[0].filename}`;
    if (files?.authorImage?.[0]) updateData.authorImage = `/uploads/authors/${files.authorImage[0].filename}`;
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) { res.status(404).json({ success: false, message: 'Blog not found' }); return; }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('updateBlog error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error updating blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) { res.status(404).json({ success: false, message: 'Blog not found' }); return; }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('deleteBlog error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error deleting blog' });
  }
};

export const getBlogCategories = async (_req: Request, res: Response): Promise<void> => {
  const categories = [
    'Artificial Intelligence', 'Blockchain', 'Data Science and Analytics',
    'Enterprise', 'Industry', 'Software Development', 'Technology', 'UI/UX Design',
  ];
  res.json({ success: true, data: categories });
};
