import { Router } from 'express';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../controllers/notificationController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.get('/', adminAuth, getNotifications);
router.put('/:id/read', adminAuth, markNotificationRead);
router.put('/read-all', adminAuth, markAllNotificationsRead);

export default router;
