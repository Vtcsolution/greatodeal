import { Request, Response } from 'express';
import PortfolioProject from '../models/PortfolioProject';
import PortfolioSettings from '../models/PortfolioSettings';

async function getSettingsDoc() {
  let settings = await PortfolioSettings.findOne();
  if (!settings) settings = await PortfolioSettings.create({ isVisible: false });
  return settings;
}

export const getPortfolioSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getSettingsDoc();
    res.json({ success: true, data: { isVisible: settings.isVisible } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolio settings' });
  }
};

export const updatePortfolioSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isVisible } = req.body as { isVisible: boolean };
    const settings = await getSettingsDoc();
    settings.isVisible = !!isVisible;
    await settings.save();
    res.json({ success: true, data: { isVisible: settings.isVisible } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating portfolio settings' });
  }
};

export const getPublicPortfolio = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getSettingsDoc();
    if (!settings.isVisible) {
      res.json({ success: true, data: { isVisible: false, projects: [] } });
      return;
    }
    const projects = await PortfolioProject.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: { isVisible: true, projects } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolio' });
  }
};

export const getPublicPortfolioProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await getSettingsDoc();
    if (!settings.isVisible) { res.status(404).json({ success: false, message: 'Portfolio not available' }); return; }
    const project = await PortfolioProject.findById(req.params.id);
    if (!project) { res.status(404).json({ success: false, message: 'Project not found' }); return; }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project' });
  }
};

export const getPortfolioProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await PortfolioProject.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolio projects' });
  }
};

export const getPortfolioProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await PortfolioProject.findById(req.params.id);
    if (!project) { res.status(404).json({ success: false, message: 'Project not found' }); return; }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project' });
  }
};

function parseListField(value: unknown): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value as string];
}

function parseKeyFeatures(value: unknown): Array<{ title: string; description: string }> {
  if (!value) return [];
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((f) => f && typeof f.title === 'string' && f.title.trim())
      .map((f) => ({ title: String(f.title).trim(), description: String(f.description || '').trim() }));
  } catch {
    return [];
  }
}

export const createPortfolioProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    const images = files.map(f => `/uploads/portfolio/${f.filename}`);
    const project = await PortfolioProject.create({
      title: req.body.title,
      subtitle: req.body.subtitle || undefined,
      description: req.body.description,
      strategicImpact: req.body.strategicImpact || undefined,
      category: req.body.category || undefined,
      year: req.body.year || undefined,
      status: req.body.status === 'inactive' ? 'inactive' : 'active',
      techStack: parseListField(req.body.techStack),
      keyFeatures: parseKeyFeatures(req.body.keyFeatures),
      projectUrl: req.body.projectUrl || undefined,
      videoUrl: req.body.videoUrl || undefined,
      order: Number(req.body.order) || 0,
      images,
    });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('createPortfolioProject error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error creating project' });
  }
};

export const updatePortfolioProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    const newImages = files.map(f => `/uploads/portfolio/${f.filename}`);
    const keepImages = parseListField(req.body.keepImages);
    const updateData = {
      title: req.body.title,
      subtitle: req.body.subtitle || undefined,
      description: req.body.description,
      strategicImpact: req.body.strategicImpact || undefined,
      category: req.body.category || undefined,
      year: req.body.year || undefined,
      status: req.body.status === 'inactive' ? 'inactive' : 'active',
      techStack: parseListField(req.body.techStack),
      keyFeatures: parseKeyFeatures(req.body.keyFeatures),
      projectUrl: req.body.projectUrl || undefined,
      videoUrl: req.body.videoUrl || undefined,
      order: Number(req.body.order) || 0,
      images: [...keepImages, ...newImages],
    };
    const project = await PortfolioProject.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) { res.status(404).json({ success: false, message: 'Project not found' }); return; }
    res.json({ success: true, data: project });
  } catch (error) {
    console.error('updatePortfolioProject error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error updating project' });
  }
};

export const deletePortfolioProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) { res.status(404).json({ success: false, message: 'Project not found' }); return; }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting project' });
  }
};
