import { Router } from 'express';
import {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
  addMessage,
  generateReply,
} from '../controllers/linkedinController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.use(adminAuth);

router.get('/', getContacts);
router.post('/', createContact);
router.get('/:id', getContactById);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.post('/:id/messages', addMessage);
router.post('/:id/generate-reply', generateReply);

export default router;
