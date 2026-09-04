import { Router } from 'express';
import { createBlog, getBlogs, getBlogById, getBlogByIdAdmin, updateBlog, deleteBlog, getBlogCategories } from '../controllers/blogController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/categories/all', getBlogCategories);
router.get('/', getBlogs);
router.get('/admin/:id', adminAuth, requireFullAdmin, getBlogByIdAdmin);
router.get('/:id', getBlogById);
router.post('/', adminAuth, requireFullAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }]), createBlog);
router.put('/:id', adminAuth, requireFullAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'authorImage', maxCount: 1 }]), updateBlog);
router.delete('/:id', adminAuth, requireFullAdmin, deleteBlog);

export default router;
