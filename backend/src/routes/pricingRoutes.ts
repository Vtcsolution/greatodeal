import { Router } from 'express';
import {
  getPricingTiers,
  getPricingTierById,
  createPricingTier,
  updatePricingTier,
  deletePricingTier,
  getPricingSettings,
  updatePricingSettings,
  getPublicPricing,
} from '../controllers/pricingController';
import { adminAuth, requireFullAdmin } from '../middleware/adminAuth';

const router = Router();

router.get('/public', getPublicPricing);

router.use(adminAuth, requireFullAdmin);
router.get('/settings', getPricingSettings);
router.put('/settings', updatePricingSettings);
router.get('/', getPricingTiers);
router.post('/', createPricingTier);
router.get('/:id', getPricingTierById);
router.put('/:id', updatePricingTier);
router.delete('/:id', deletePricingTier);

export default router;
