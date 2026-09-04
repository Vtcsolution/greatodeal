import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  adminId?: string;
  accessLevel?: 'admin' | 'operator';
}

export const adminAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; accessLevel?: 'admin' | 'operator' };
    req.adminId = decoded.id;
    req.accessLevel = decoded.accessLevel || 'admin';
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Blocks operator-level accounts from admin-only sections (Blog, Work, Pricing,
// Knowledge Base, Analytics, Team management, financial stats). Must run after adminAuth.
export const requireFullAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.accessLevel === 'operator') {
    res.status(403).json({ success: false, message: 'This section requires full admin access' });
    return;
  }
  next();
};
