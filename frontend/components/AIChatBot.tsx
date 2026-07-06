'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatApi } from '@/lib/api';
import type { ChatMessage } from '@/types';

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const getUserId = (): string => {
  if (typeof window === 'undefined') return 'anonymous';
  let id = localStorage.getItem('chatUserId');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('chatUserId', id);
  }
  return id;
};

export default function AIChatBot({ isOpen, onClose }: AIChatBotProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isOpen && !chatId) {
      chatApi.start(getUserId()).then(res => {
        if (res.data.success) {
          setChatId(res.data.chatId);
          setMessages((res.data.messages as Array<{ role: string; content: string }>).map(m => ({ text: m.content, sender: m.role as 'user' | 'ai' })));
        }
      }).catch(() => {
        setMessages([{ text: "Hello! I'm AI Greato, your professional IT consultant. How can I help you today?", sender: 'ai' }]);
      });
    }
  }, [isOpen, chatId]);

  const sendMessage = async () => {
    if (!input.trim() || !chatId) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    try {
      const res = await chatApi.send(chatId, userMsg);
      if (res.data.success) setMessages(prev => [...prev, { text: res.data.response, sender: 'ai' }]);
    } catch {
      setMessages(prev => [...prev, { text: 'Sorry, something went wrong. Please try again.', sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const quickButtons = [
    { label: 'Services', prompt: 'What services do you offer?' },
    { label: 'Portfolio', prompt: 'Show me your portfolio' },
    { label: 'Pricing', prompt: 'What are your pricing models?' },
    { label: 'Support', prompt: 'How can I contact your team?' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed ${isFullScreen ? 'inset-0' : 'bottom-20 right-3 sm:right-6'} bg-[#0D0D0D] rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden z-50 flex flex-col`}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3 }}
          style={isFullScreen ? { width: '100%', height: '100%' } : { width: '100%', maxWidth: '420px', height: '600px' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#111] px-5 py-4 flex justify-between items-center flex-shrink-0 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-[#6EE7B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Greato</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#6EE7B7] rounded-full animate-pulse" />
                  <p className="text-white/40 text-sm">Online</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors" aria-label={isFullScreen ? 'Minimize' : 'Expand'}>
                {isFullScreen ? <Minimize2 className="w-4 h-4 text-white/50" /> : <Maximize2 className="w-4 h-4 text-white/50" />}
              </button>
              <button onClick={() => { onClose(); setMessages([]); setChatId(null); }} className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors" aria-label="Close">
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatBodyRef} className="flex-grow overflow-y-auto bg-[#090909] px-4 py-4">
            {messages.length === 0 && !isTyping && (
              <div className="flex justify-center items-center h-48">
                <div className="text-center max-w-xs">
                  <div className="w-16 h-16 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-[#6EE7B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Hello!</h3>
                  <p className="text-white/50 text-sm leading-relaxed">I&apos;m AI Greato, your IT consultant. Ask me anything about our services.</p>
                </div>
              </div>
            )}
            <div className="space-y-3 mb-4">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl break-words ${
                    msg.sender === 'user'
                      ? 'bg-[#6EE7B7]/15 border border-[#6EE7B7]/20 text-white rounded-br-md'
                      : 'bg-white/[0.04] border border-white/[0.06] text-white/90 rounded-bl-md'
                  }`}>
                    {msg.sender === 'user' ? (
                      <p className="text-sm leading-relaxed text-white">{msg.text}</p>
                    ) : (
                      <div className="chatbot-content text-sm leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 150, 300].map(delay => (
                        <div key={delay} className="w-1.5 h-1.5 bg-[#6EE7B7] rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                    <span className="text-sm text-white/40">Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-[#0D0D0D] border-t border-white/[0.06] flex-shrink-0">
            <div className="relative">
              <input
                type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyPress}
                placeholder="Ask about IT solutions, AI, web development..."
                className="w-full pr-12 pl-4 py-3 bg-[#111] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-[#6EE7B7]/30 focus:border-[#6EE7B7]/30 outline-none transition-all text-sm"
              />
              <button onClick={sendMessage} disabled={!input.trim()} aria-label="Send message" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#6EE7B7] hover:text-[#5CD7A5] disabled:text-white/20 disabled:cursor-not-allowed transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/[0.04]">
              {quickButtons.map(({ label, prompt }) => (
                <button key={label} onClick={() => setInput(prompt)}
                  className="px-3 py-1.5 border border-[#6EE7B7]/20 text-[#6EE7B7] text-xs rounded-lg hover:bg-[#6EE7B7]/10 transition-colors font-medium">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
