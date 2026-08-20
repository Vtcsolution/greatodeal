import { Router } from 'express';
import { trackVisit, getAnalyticsSummary } from '../controllers/analyticsController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

router.post('/track', trackVisit);
router.get('/summary', adminAuth, getAnalyticsSummary);

export default router;
