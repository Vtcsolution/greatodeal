import { Router } from 'express';
import { getFolderCounts, getFolderMessages, getMessage, moveMessage, deleteMessage } from '../controllers/mailboxController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.get('/folders', adminAuth, getFolderCounts);
router.get('/folders/:folder', adminAuth, getFolderMessages);
router.get('/message/:id', adminAuth, getMessage);
router.put('/message/:id/move', adminAuth, moveMessage);
router.delete('/message/:id', adminAuth, deleteMessage);

export default router;
