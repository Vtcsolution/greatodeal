import { Router } from 'express';
import { addComment, getComments, likeComment, deleteComment } from '../controllers/commentController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();
router.post('/:blogId/comments', addComment);
router.get('/:blogId/comments', getComments);
router.put('/:commentId/like', likeComment);
router.delete('/:commentId', adminAuth, requireFullAdmin, deleteComment);

export default router;
