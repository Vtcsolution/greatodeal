import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

let io: SocketIOServer | null = null;

const ADMIN_ROOM = 'admins';

export const initSocket = (httpServer: HttpServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  io.use((socket: Socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) return next(new Error('Unauthorized'));
      jwt.verify(token as string, process.env.JWT_SECRET as string);
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket: Socket) => {
    socket.join(ADMIN_ROOM);
    socket.on('disconnect', () => {
      // no-op, socket.io cleans up rooms automatically
    });
  });

  console.log('🔌 Socket.IO initialized');
  return io;
};

export const getIO = (): SocketIOServer | null => io;

export const emitToAdmins = (event: string, payload: unknown): void => {
  if (!io) return;
  io.to(ADMIN_ROOM).emit(event, payload);
};
