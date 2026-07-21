import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import blogRoutes from './routes/blogRoutes';
import contactRoutes from './routes/contactRoutes';
import chatRoutes from './routes/chatRoutes';
import adminRoutes from './routes/adminRoutes';
import commentRoutes from './routes/commentRoutes';
import partnershipRoutes from './routes/partnershipRoutes';
import knowledgeRoutes from './routes/knowledgeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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

app.get('/api/health', (_req, res) => res.json({ status: 'OK', message: 'Greatodeal API running' }));

const server = app.listen(PORT, () => {
  console.log(`🚀 Greatodeal Backend API running on port ${PORT}`);
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
