import { Router } from 'express';
import { trackEmailOpen } from '../controllers/emailTrackingController';

// Public route (no auth) — this is fetched by email clients loading the tracking pixel.
const router = Router();
router.get('/pixel/:trackingId', trackEmailOpen);

export default router;
