import { Request, Response } from 'express';
import PageContent from '../models/PageContent';

// Only fields an admin has actually overridden are stored/returned — the frontend
// falls back to its own hardcoded copy for anything missing, so this collection
// can start empty and pages never render blank text.

export const getPublicPageContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await PageContent.findOne({ page: req.params.page });
    res.json({ success: true, data: doc ? Object.fromEntries(doc.fields) : {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching page content' });
  }
};

export const listPageContent = async (_req: Request, res: Response): Promise<void> => {
  try {
    const docs = await PageContent.find();
    res.json({
      success: true,
      data: docs.map(d => ({ page: d.page, fields: Object.fromEntries(d.fields), updatedAt: d.updatedAt })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching page content' });
  }
};

export const getAdminPageContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await PageContent.findOne({ page: req.params.page });
    res.json({ success: true, data: doc ? Object.fromEntries(doc.fields) : {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching page content' });
  }
};

export const updatePageContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fields } = req.body as { fields: Record<string, string> };
    const doc = await PageContent.findOneAndUpdate(
      { page: req.params.page },
      { $set: { fields: fields || {} } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: Object.fromEntries(doc.fields) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating page content' });
  }
};
