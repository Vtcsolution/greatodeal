import { Router } from 'express';
import {
  getTemplates,
  upsertTemplate,
  deleteTemplate,
  getEmailLogs,
  triggerFollowUpCycle,
} from '../controllers/followUpController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.get('/templates', adminAuth, getTemplates);
router.post('/templates', adminAuth, upsertTemplate);
router.delete('/templates/:id', adminAuth, deleteTemplate);
router.get('/logs', adminAuth, getEmailLogs);
router.post('/run-now', adminAuth, triggerFollowUpCycle);

export default router;
