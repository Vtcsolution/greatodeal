import { Router } from 'express';
import {
  login,
  getProfile,
  updateProfile,
  getStats,
  getBusinessOverview,
  listTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/adminController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();
router.post('/login', login);
router.get('/profile', adminAuth, getProfile);
router.put('/profile', adminAuth, updateProfile);
router.get('/stats', adminAuth, requireFullAdmin, getStats);
router.get('/business-overview', adminAuth, requireFullAdmin, getBusinessOverview);

router.get('/team', adminAuth, requireFullAdmin, listTeam);
router.post('/team', adminAuth, requireFullAdmin, createTeamMember);
router.put('/team/:id', adminAuth, requireFullAdmin, updateTeamMember);
router.delete('/team/:id', adminAuth, requireFullAdmin, deleteTeamMember);

export default router;
