import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';

// Attaches the derived money figures so the frontend never has to recompute
// totals itself — one source of truth for "what does this project actually cost."
function withTotals(project: IProject) {
  const obj = project.toObject();
  const totalExpenses = (obj.expenses || []).reduce((sum: number, e: { amount: number }) => sum + (e.amount || 0), 0);
  const remainingBudget = (obj.budget || 0) - totalExpenses;
  const amountDue = (obj.budget || 0) - (obj.amountPaidByClient || 0);
  return { ...obj, totalExpenses, remainingBudget, amountDue };
}

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contactId, clientName, clientEmail, company, projectName, projectType } = req.body;
    if (!contactId || !clientName || !clientEmail || !projectName || !projectType) {
      res.status(400).json({ success: false, message: 'contactId, clientName, clientEmail, projectName, and projectType are required' });
      return;
    }

    const project = await Project.create({
      contactId,
      clientName,
      clientEmail,
      company,
      projectName,
      projectType,
      description: req.body.description,
      status: req.body.status || 'planning',
      startDate: req.body.startDate || new Date(),
      targetEndDate: req.body.targetEndDate || null,
      budget: Number(req.body.budget) || 0,
      amountPaidByClient: Number(req.body.amountPaidByClient) || 0,
      currency: req.body.currency || 'USD',
      features: req.body.features || [],
      milestones: req.body.milestones || [],
      expenses: req.body.expenses || [],
    });

    res.status(201).json({ success: true, data: withTotals(project) });
  } catch (error) {
    console.error('createProject error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error creating project' });
  }
};

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects.map(withTotals) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching projects', error });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) { res.status(404).json({ success: false, message: 'Project not found' }); return; }
    res.json({ success: true, data: withTotals(project) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project', error });
  }
};

export const getProjectByContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ contactId: req.params.contactId }).sort({ createdAt: -1 });
    if (!project) { res.json({ success: true, data: null }); return; }
    res.json({ success: true, data: withTotals(project) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project', error });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const allowed = [
      'projectName', 'projectType', 'description', 'status', 'startDate', 'targetEndDate', 'completedAt',
      'budget', 'amountPaidByClient', 'currency', 'features', 'milestones', 'expenses',
      'clientName', 'clientEmail', 'company',
    ];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in req.body) updates[key] = req.body[key];
    }
    if (updates.status === 'completed' && !('completedAt' in updates)) {
      updates.completedAt = new Date();
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!project) { res.status(404).json({ success: false, message: 'Project not found' }); return; }
    res.json({ success: true, data: withTotals(project) });
  } catch (error) {
    console.error('updateProject error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error updating project' });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting project', error });
  }
};
