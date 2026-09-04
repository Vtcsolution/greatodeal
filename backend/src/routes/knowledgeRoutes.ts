import { Router } from 'express';
import { getKnowledge, updateKnowledge, addCategory, addLinkToCategory, deleteCategory, getPortfolio } from '../controllers/knowledgeController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();

router.get('/portfolio', getPortfolio);
router.get('/', adminAuth, requireFullAdmin, getKnowledge);
router.put('/', adminAuth, requireFullAdmin, updateKnowledge);
router.post('/category', adminAuth, requireFullAdmin, addCategory);
router.post('/category/:categoryName/link', adminAuth, requireFullAdmin, addLinkToCategory);
router.delete('/category/:categoryName', adminAuth, requireFullAdmin, deleteCategory);

export default router;
