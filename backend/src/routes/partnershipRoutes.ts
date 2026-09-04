import { Router } from 'express';
import { submitPartnership, getAllPartnerships, updatePartnershipStatus } from '../controllers/partnershipController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();
router.post('/submit', submitPartnership);
router.get('/applications', adminAuth, requireFullAdmin, getAllPartnerships);
router.put('/applications/:id/status', adminAuth, requireFullAdmin, updatePartnershipStatus);

export default router;
