import { Request, Response } from 'express';
import PricingTier from '../models/PricingTier';
import PricingSettings from '../models/PricingSettings';

async function getSettingsDoc() {
  let settings = await PricingSettings.findOne();
  if (!settings) settings = await PricingSettings.create({ isVisible: false });
  return settings;
}

export const getPricingSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getSettingsDoc();
    res.json({ success: true, data: { isVisible: settings.isVisible } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pricing settings' });
  }
};

export const updatePricingSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isVisible } = req.body as { isVisible: boolean };
    const settings = await getSettingsDoc();
    settings.isVisible = !!isVisible;
    await settings.save();
    res.json({ success: true, data: { isVisible: settings.isVisible } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating pricing settings' });
  }
};

export const getPublicPricing = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getSettingsDoc();
    if (!settings.isVisible) {
      res.json({ success: true, data: { isVisible: false, tiers: [] } });
      return;
    }
    const tiers = await PricingTier.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: { isVisible: true, tiers } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pricing' });
  }
};

export const getPricingTiers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tiers = await PricingTier.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: tiers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pricing tiers' });
  }
};

export const getPricingTierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tier = await PricingTier.findById(req.params.id);
    if (!tier) { res.status(404).json({ success: false, message: 'Pricing tier not found' }); return; }
    res.json({ success: true, data: tier });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pricing tier' });
  }
};

export const createPricingTier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, badge, description, currency, price, priceSuffix, features, order } = req.body;
    const tier = await PricingTier.create({
      title,
      badge: badge || undefined,
      description,
      currency: currency || '$',
      price,
      priceSuffix: priceSuffix || undefined,
      features: Array.isArray(features) ? features : [],
      order: Number(order) || 0,
    });
    res.status(201).json({ success: true, data: tier });
  } catch (error) {
    console.error('createPricingTier error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error creating pricing tier' });
  }
};

export const updatePricingTier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, badge, description, currency, price, priceSuffix, features, order } = req.body;
    const tier = await PricingTier.findByIdAndUpdate(
      req.params.id,
      {
        title,
        badge: badge || undefined,
        description,
        currency: currency || '$',
        price,
        priceSuffix: priceSuffix || undefined,
        features: Array.isArray(features) ? features : [],
        order: Number(order) || 0,
      },
      { new: true }
    );
    if (!tier) { res.status(404).json({ success: false, message: 'Pricing tier not found' }); return; }
    res.json({ success: true, data: tier });
  } catch (error) {
    console.error('updatePricingTier error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error updating pricing tier' });
  }
};

export const deletePricingTier = async (req: Request, res: Response): Promise<void> => {
  try {
    const tier = await PricingTier.findByIdAndDelete(req.params.id);
    if (!tier) { res.status(404).json({ success: false, message: 'Pricing tier not found' }); return; }
    res.json({ success: true, message: 'Pricing tier deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting pricing tier' });
  }
};
