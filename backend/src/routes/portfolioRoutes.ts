import { Router } from 'express';
import {
  getPortfolioProjects,
  getPortfolioProjectById,
  createPortfolioProject,
  updatePortfolioProject,
  updatePortfolioProjectOrder,
  deletePortfolioProject,
  getPortfolioSettings,
  updatePortfolioSettings,
  getPublicPortfolio,
  getPublicPortfolioProjectById,
} from '../controllers/portfolioController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/public', getPublicPortfolio);
router.get('/public/:id', getPublicPortfolioProjectById);

router.use(adminAuth, requireFullAdmin);
router.get('/settings', getPortfolioSettings);
router.put('/settings', updatePortfolioSettings);
router.get('/', getPortfolioProjects);
router.post('/', upload.array('images', 10), createPortfolioProject);
router.get('/:id', getPortfolioProjectById);
router.put('/:id', upload.array('images', 10), updatePortfolioProject);
router.patch('/:id/order', updatePortfolioProjectOrder);
router.delete('/:id', deletePortfolioProject);

export default router;
