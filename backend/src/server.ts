// Must be the very first import: loads .env into process.env before any other
// module (emailService, imapService, etc.) reads env vars at module-load time.
import 'dotenv/config';

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import connectDB from './config/db';
import blogRoutes from './routes/blogRoutes';
import contactRoutes from './routes/contactRoutes';
import chatRoutes from './routes/chatRoutes';
import adminRoutes from './routes/adminRoutes';
import commentRoutes from './routes/commentRoutes';
import partnershipRoutes from './routes/partnershipRoutes';
import knowledgeRoutes from './routes/knowledgeRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import emailTrackingRoutes from './routes/emailTrackingRoutes';
import notificationRoutes from './routes/notificationRoutes';
import followUpRoutes from './routes/followUpRoutes';
import mailboxRoutes from './routes/mailboxRoutes';
import leadFinderRoutes from './routes/leadFinderRoutes';
import projectRoutes from './routes/projectRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import pricingRoutes from './routes/pricingRoutes';
import { initSocket } from './utils/socket';
import { startFollowUpCron } from './services/followUpEngine';
import { startImapPolling } from './services/imapService';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5001;

app.set('trust proxy', 1);

connectDB();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', limiter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/partnership', partnershipRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/email-tracking', emailTrackingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/followups', followUpRoutes);
app.use('/api/mailbox', mailboxRoutes);
app.use('/api/lead-finder', leadFinderRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/pricing', pricingRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'OK', message: 'Greatodeal API running' }));

app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!err) return next();
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'Image is too large. Maximum size is 8MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  console.error('Unhandled request error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

initSocket(httpServer);

const server = httpServer.listen(PORT, () => {
  console.log(`🚀 Greatodeal Backend API running on port ${PORT}`);
  startFollowUpCron();
  startImapPolling();
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} in use, retrying in 3s...`);
    setTimeout(() => { server.close(); server.listen(PORT); }, 3000);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception, shutting down:', err);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection, shutting down:', err);
  process.exit(1);
});

export default app;
