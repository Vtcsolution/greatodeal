import { Router } from 'express';
import {
  submitContact,
  getAllContacts,
  replyToContact,
  updateLeadStatus,
  toggleFollowUp,
} from '../controllers/contactController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.post('/send', submitContact);
router.get('/all', adminAuth, getAllContacts);
router.post('/reply', adminAuth, replyToContact);
router.put('/:id/lead-status', adminAuth, updateLeadStatus);
router.put('/:id/follow-up', adminAuth, toggleFollowUp);

export default router;
