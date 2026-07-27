'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import AutomationJourney from '@/components/AutomationJourney';
import { Bot, Layers, Eye, MessageSquare, Database, ShieldCheck } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'AI Automation',
  subtitle: 'Agentic Automation for Every Team',
  description: "Most businesses aren't short on effort, they're short on connected systems. We build agentic AI automation that closes the gap between scattered tools and one connected operation, so manual work stops being the default.",
  icon: Bot,
  heroIcon: Bot,
  stats: [
    { value: '100%', label: 'Actions Logged' },
    { value: '24/7', label: 'Automated Monitoring' },
    { value: 'Zero', label: 'Manual Handoff Gaps' },
    { value: '6+', label: 'Years Building AI' },
  ],
  challenges: [
    'Repeated manual work that should already be automated',
    'Data scattered across disconnected tools and systems',
    'No real-time visibility into what is actually happening operationally',
    'Automation pilots that stall before reaching production',
    'Customer response times slowed down by manual handoffs',
    'Teams spending time on tasks instead of decisions',
    'Legacy workflows that resist integration with modern AI tools',
    'Automation projects that lack audit trails or human oversight',
  ],
  solutions: [
    { icon: Layers, title: 'Agentic Workflow Automation', desc: 'Autonomous agents that execute multi-step tasks end-to-end, with a human review step built in wherever it matters.' },
    { icon: Database, title: 'Connected Systems Integration', desc: 'We connect the tools you already run into one operational picture instead of adding another silo.' },
    { icon: Eye, title: 'Operational Visibility Dashboards', desc: 'Real-time visibility into what is actually happening, not a report generated after the fact.' },
    { icon: MessageSquare, title: 'Automated Customer Response', desc: 'AI-assisted responses that handle repetitive requests while escalating what actually needs a human.' },
    { icon: Database, title: 'Data Pipeline Automation', desc: 'Automated data movement and processing between systems, with logging for every step.' },
    { icon: ShieldCheck, title: 'Human-in-the-Loop Review', desc: 'Every automated action stays reviewable, so speed never comes at the cost of control.' },
  ],
  features: [
    'Agentic task automation', 'Connected data pipelines', 'Real-time operational dashboards',
    'Automated customer workflows', 'Human-in-the-loop approval steps', 'Full action audit logging',
    'Legacy system integration', 'Custom automation agents', 'Cross-platform data sync',
    'Scalable cloud-native architecture',
  ],
  technologies: ['Python', 'Node.js', 'LangChain', 'OpenAI', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow'],
  customSection: <AutomationJourney />,
};

export default function AIAutomationPage() {
  return <IndustryPageTemplate data={pageData} />;
}
