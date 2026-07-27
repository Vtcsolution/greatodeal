'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Sparkles } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1] as const;

interface JourneyNode { label: string; title: string; desc: string; top: string; left: string; }

const problemNodes: JourneyNode[] = [
  { label: '01', title: 'Scattered Tools', desc: 'Data lives in too many places, and the team keeps switching context.', top: '6%', left: '4%' },
  { label: '02', title: 'Repeated Work', desc: 'Human time is spent on tasks that should already be systemized.', top: '46%', left: '38%' },
  { label: '03', title: 'No Operational Clarity', desc: "Owners can't see what's happening until the problem is already visible.", top: '84%', left: '76%' },
];

const timelineNodes: JourneyNode[] = [
  { label: 'TODAY', title: 'Manual Feels Normal', desc: 'Manual tasks still feel routine, so the cost stays invisible.', top: '86%', left: '4%' },
  { label: 'SOON', title: 'Slow Systems Lose Customers', desc: 'Disconnected tools start costing response time and trust.', top: '60%', left: '32%' },
  { label: 'NEXT', title: 'Automation Becomes Expected', desc: 'Automated workflows stop being a differentiator and start being the baseline.', top: '35%', left: '60%' },
  { label: 'WINNER', title: 'Connected Systems Win', desc: 'Connected, auditable systems become the actual business edge.', top: '10%', left: '86%' },
];

function CurvePath({ d, accentId, delay }: { d: string; accentId: string; delay: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full hidden lg:block" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={accentId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke={`url(#${accentId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease }}
      />
    </svg>
  );
}

function NodeCard({ node, index, accent }: { node: JourneyNode; index: number; accent: string }) {
  return (
    <motion.div
      className="relative lg:absolute w-full lg:w-[280px] bg-[#0D0D0D]/90 backdrop-blur-xl border rounded-2xl p-5 shadow-2xl shadow-black/40 mb-4 lg:mb-0"
      style={{ top: node.top, left: node.left, borderColor: accent + '40' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.6, ease }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-bold tracking-[0.15em] px-2 py-0.5 rounded-full" style={{ backgroundColor: accent + '15', color: accent }}>{node.label}</span>
      </div>
      <h4 className="text-base font-bold text-white mb-1.5 tracking-tight">{node.title}</h4>
      <p className="text-sm text-white/60 leading-relaxed">{node.desc}</p>
    </motion.div>
  );
}

export default function AutomationJourney() {
  return (
    <>
      {/* ═══ THE REAL PROBLEM ═══ */}
      <section className="relative py-24 sm:py-32 bg-[#060606] border-y border-white/[0.04] overflow-hidden">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6">
                <AlertTriangle className="w-4 h-4" /> The Real Problem
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-white mb-6">
                Most businesses aren&apos;t short of effort. They&apos;re short of{' '}
                <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">connected systems</span>.
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-[1.8] max-w-lg">
                Teams work hard every day. They answer the same questions, chase the same follow-ups, copy the same data, and prepare the same reports. At first it looks like routine. As the business grows, that routine becomes friction, and friction becomes lost time, delayed customers, and unclear decisions.
              </p>
            </motion.div>

            <div className="relative min-h-[420px] lg:min-h-[480px]">
              <CurvePath accentId="problemCurve" delay={0.2} d="M40,40 C220,90 300,220 460,280 C620,340 760,440 940,540" />
              <div className="relative lg:static space-y-4 lg:space-y-0">
                {problemNodes.map((n, i) => <NodeCard key={n.title} node={n} index={i} accent="#3B82F6" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IT'S NOT PREDICTION, IT'S A TRUTH ═══ */}
      <section className="relative py-24 sm:py-32 bg-[#090909] overflow-hidden">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative min-h-[420px] lg:min-h-[480px] order-2 lg:order-1">
              <CurvePath accentId="timelineCurve" delay={0.2} d="M60,560 C220,520 260,440 360,400 C480,350 540,280 640,240 C760,190 820,120 940,60" />
              <div className="relative lg:static space-y-4 lg:space-y-0">
                {timelineNodes.map((n, i) => <NodeCard key={n.title} node={n} index={i} accent="#6EE7B7" />)}
              </div>
            </div>

            <motion.div className="order-1 lg:order-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6">
                <Sparkles className="w-4 h-4" /> It&apos;s Not Prediction, It&apos;s a Truth
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-white mb-6">
                Automation will move from{' '}
                <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">advantage to necessity</span>.
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-[1.8] max-w-lg">
                Growing businesses won&apos;t keep asking whether to automate. They&apos;ll ask why they waited. Manual follow-ups, repeated data entry, slow customer replies, and disconnected tools are already becoming expensive. The businesses that win won&apos;t be the ones using the most software, they&apos;ll be the ones whose systems work together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
