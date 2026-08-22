'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { Banknote, Shield, Lock, BarChart2 } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'Fintech',
  subtitle: 'Compliance-Grade Financial AI',
  description: 'Financial institutions can\'t bolt on compliance after the fact. We build AI-driven automation and infrastructure for banks, payment companies, and fintech platforms, engineered for KYC/AML, transaction auditability, and fraud resilience from the ground up.',
  icon: Banknote,
  heroIcon: Banknote,
  stats: [
    { value: 'PCI DSS', label: 'Compliance Ready' },
    { value: '100%', label: 'Transaction Audit Trail' },
    { value: 'Real-Time', label: 'Fraud Detection' },
    { value: '6+', label: 'Years FinTech Exp.' },
  ],
  challenges: [
    'Regulatory compliance across KYC, AML, PCI DSS, and open-banking rules',
    'Legacy core banking systems that resist modernization without service risk',
    'Real-time fraud detection at transaction scale',
    'Cross-border payment complexity and multi-currency settlement',
    'Auditable trails required for every financial decision and transaction',
    'Security vulnerabilities in customer-facing financial applications',
  ],
  solutions: [
    { icon: Lock, title: 'KYC/AML Automation', desc: 'Automated identity verification and AML screening with a full audit trail for every compliance decision.' },
    { icon: Shield, title: 'AI-Powered Fraud Detection', desc: 'Machine-learning fraud detection that flags and blocks suspicious transactions in real time, with explainable alerts for compliance review.' },
    { icon: BarChart2, title: 'Auditable Transaction Infrastructure', desc: 'Payment and ledger systems that log every transaction immutably, built to satisfy financial-audit and regulatory-reporting requirements.' },
    { icon: Banknote, title: 'Open Banking & API Integration', desc: 'PSD2-compliant open-banking APIs and secure integrations with core banking, card networks, and payment rails.' },
  ],
  features: [
    'PCI DSS & GDPR compliant architecture', 'Real-time transaction monitoring', 'Automated KYC/AML screening',
    'Immutable transaction audit logs', 'End-to-end encryption', 'Multi-currency & cross-border support',
    'Open banking API integration', 'Regulatory reporting automation',
  ],
  technologies: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'Kafka', 'AWS', 'Stripe API', 'Plaid', 'OAuth2', 'TensorFlow'],
};

export default function FintechPage() {
  return <IndustryPageTemplate data={pageData} />;
}
