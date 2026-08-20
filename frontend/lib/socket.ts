import { io, Socket } from 'socket.io-client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

let socket: Socket | null = null;

/**
 * Lazily creates (or reuses) a single authenticated socket connection for the
 * admin panel. Pass the current admin JWT so the backend can verify it.
 */
export const getSocket = (token: string): Socket => {
  if (socket && socket.connected) return socket;
  if (socket) socket.disconnect();

  socket = io(API_BASE, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 2000,
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
