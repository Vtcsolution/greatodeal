import { Router } from 'express';
import { login, getProfile, updateProfile, getStats, getBusinessOverview } from '../controllers/adminController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.post('/login', login);
router.get('/profile', adminAuth, getProfile);
router.put('/profile', adminAuth, updateProfile);
router.get('/stats', adminAuth, getStats);
router.get('/business-overview', adminAuth, getBusinessOverview);

export default router;
