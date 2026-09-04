import { Router } from 'express';
import { trackVisit, getAnalyticsSummary } from '../controllers/analyticsController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();

router.post('/track', trackVisit);
router.get('/summary', adminAuth, requireFullAdmin, getAnalyticsSummary);

export default router;
