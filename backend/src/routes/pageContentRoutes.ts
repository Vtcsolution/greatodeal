import { Router } from 'express';
import { getPublicPageContent, listPageContent, getAdminPageContent, updatePageContent } from '../controllers/pageContentController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();

router.get('/public/:page', getPublicPageContent);

router.use(adminAuth, requireFullAdmin);
router.get('/', listPageContent);
router.get('/:page', getAdminPageContent);
router.put('/:page', updatePageContent);

export default router;
