import { Router } from 'express';
import {
  getPortfolioProjects,
  getPortfolioProjectById,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  getPortfolioSettings,
  updatePortfolioSettings,
  getPublicPortfolio,
} from '../controllers/portfolioController';
import { adminAuth } from '../middleware/adminAuth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/public', getPublicPortfolio);

router.use(adminAuth);
router.get('/settings', getPortfolioSettings);
router.put('/settings', updatePortfolioSettings);
router.get('/', getPortfolioProjects);
router.post('/', upload.array('images', 10), createPortfolioProject);
router.get('/:id', getPortfolioProjectById);
router.put('/:id', upload.array('images', 10), updatePortfolioProject);
router.delete('/:id', deletePortfolioProject);

export default router;
