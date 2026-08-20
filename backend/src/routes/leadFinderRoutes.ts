import { Router } from 'express';
import { searchCompanies, importLead, getProspects } from '../controllers/leadFinderController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

router.post('/search', adminAuth, searchCompanies);
router.post('/import', adminAuth, importLead);
router.get('/prospects', adminAuth, getProspects);

export default router;
