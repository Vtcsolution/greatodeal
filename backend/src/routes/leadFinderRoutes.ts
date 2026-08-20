import { Router } from 'express';
import { searchCompanies, importLead } from '../controllers/leadFinderController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

router.post('/search', adminAuth, searchCompanies);
router.post('/import', adminAuth, importLead);

export default router;
