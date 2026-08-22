'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { Home, FileCheck, BarChart2, Database } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'Real Estate',
  subtitle: 'Compliance-Grade PropTech',
  description: 'Property transactions carry legal, financial, and title risk at every step. We build AI-driven platforms for real estate operators, property managers, and PropTech companies that keep transaction records, disclosures, and financial data audit-ready throughout.',
  icon: Home,
  heroIcon: Home,
  stats: [
    { value: '100%', label: 'Transaction Audit Trail' },
    { value: 'Automated', label: 'Disclosure Compliance' },
    { value: 'Real-Time', label: 'Portfolio Analytics' },
    { value: '6+', label: 'Years Platform Exp.' },
  ],
  challenges: [
    'Legal and disclosure compliance across property transactions',
    'Fragmented data across listings, title, escrow, and financing systems',
    'Manual document workflows for contracts, leases, and closings',
    'Portfolio-level financial reporting for property managers and investors',
    'Fraud risk in high-value property transactions',
    'Integrating legacy property-management systems with modern platforms',
  ],
  solutions: [
    { icon: FileCheck, title: 'Automated Disclosure & Compliance', desc: 'Transaction workflows that generate and log required disclosures automatically, reducing legal exposure and manual review time.' },
    { icon: Database, title: 'Unified Property Data Platform', desc: 'Integration layer connecting listings, title, escrow, and financing data into a single auditable record per property.' },
    { icon: BarChart2, title: 'Portfolio & Investor Reporting', desc: 'Real-time financial dashboards and automated reporting for property managers and investors, built on auditable underlying data.' },
    { icon: Home, title: 'Transaction Fraud Detection', desc: 'AI-based anomaly detection on high-value transactions and wire transfers to flag fraud risk before funds move.' },
  ],
  features: [
    'Automated disclosure generation', 'Immutable transaction records', 'Title & escrow data integration',
    'Portfolio-level financial reporting', 'Transaction fraud detection', 'Legacy PMS integration',
  ],
  technologies: ['Node.js', 'Python', 'PostgreSQL', 'AWS', 'DocuSign API', 'Plaid', 'React', 'TensorFlow'],
};

export default function RealEstatePage() {
  return <IndustryPageTemplate data={pageData} />;
}
