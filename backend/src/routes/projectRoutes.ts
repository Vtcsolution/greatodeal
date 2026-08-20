import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  getProjectByContact,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();
router.use(adminAuth);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/by-contact/:contactId', getProjectByContact);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
