import { Router } from 'express';
import {
  submitContact,
  getAllContacts,
  replyToContact,
  updateLeadStatus,
  toggleFollowUp,
  toggleDealClosed,
} from '../controllers/contactController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.post('/send', submitContact);
router.get('/all', adminAuth, getAllContacts);
router.post('/reply', adminAuth, replyToContact);
router.put('/:id/lead-status', adminAuth, updateLeadStatus);
router.put('/:id/follow-up', adminAuth, toggleFollowUp);
router.put('/:id/deal-closed', adminAuth, toggleDealClosed);

export default router;
