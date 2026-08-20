'use client';

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import { useAdmin } from './AdminContext';
import { notificationApi } from '@/lib/api';
import { getSocket, disconnectSocket } from '@/lib/socket';
import type { AppNotification } from '@/types';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  ringTick: number; // increments every time a new notification arrives — drives the bell "ring" animation
  connected: boolean;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

// Short, unobtrusive "ding" using the Web Audio API — no external asset needed.
const playDing = () => {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    // Audio not available/allowed — fail silently, visual ring still works
  }
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { admin } = useAdmin();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [ringTick, setRingTick] = useState(0);
  const [connected, setConnected] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!admin) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) return;

    notificationApi
      .getAll(50)
      .then(res => {
        if (res.data.success) {
          setNotifications(res.data.data || []);
          setUnreadCount(res.data.unreadCount || 0);
        }
      })
      .catch(() => {});

    const socket = getSocket(token);
    setConnected(socket.connected);

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onNotification = (payload: AppNotification) => {
      setNotifications(prev => [payload, ...prev].slice(0, 100));
      setUnreadCount(prev => prev + 1);
      setRingTick(prev => prev + 1);
      if (initialized.current) playDing();
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('notification', onNotification);
    initialized.current = true;

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('notification', onNotification);
    };
  }, [admin]);

  useEffect(() => {
    if (!admin) disconnectSocket();
  }, [admin]);

  const markRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => (n._id === id ? { ...n, read: true } : n)));
    setUnreadCount(prev => Math.max(0, prev - 1));
    notificationApi.markRead(id).catch(() => {});
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    notificationApi.markAllRead().catch(() => {});
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, ringTick, connected, markRead, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
