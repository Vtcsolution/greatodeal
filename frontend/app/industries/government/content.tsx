'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { Landmark, FileCheck, Database, ShieldCheck, Eye, Users } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'Government',
  subtitle: 'Public-Sector AI Infrastructure',
  description: 'Government agencies run on public trust, not uptime alone. We build agentic automation and AI systems for citizen services, case management, and inter-agency operations that hold up under audit, FOIA requests, and public scrutiny, with every automated decision logged, explainable, and reviewable.',
  icon: Landmark,
  heroIcon: Landmark,
  stats: [
    { value: 'Zero-Trust', label: 'Security Model' },
    { value: '100%', label: 'Audit Trail Coverage' },
    { value: 'Explainable', label: 'AI Decisions' },
    { value: '9+', label: 'Years Public-Sector Work' },
  ],
  challenges: [
    'Legacy case-management systems that can\'t be modernized without service disruption',
    'Manual, paper-driven workflows for permits, benefits, and citizen services',
    'Siloed data across agencies with no compliant way to share it',
    'Automated decisions that can\'t be explained or appealed by citizens',
    'Records retention, FOIA, and public-disclosure obligations',
    'Cybersecurity threats against public infrastructure and constituent data',
    'Procurement cycles that lock agencies into inflexible vendor systems',
    'Budget accountability requiring traceable, auditable spend on every system',
  ],
  solutions: [
    { icon: Users, title: 'Citizen Services Automation', desc: 'Agentic workflows that process permits, benefits applications, and service requests, with a human review step built in wherever a decision affects a citizen.' },
    { icon: Database, title: 'Secure Records & Case Management', desc: 'Case-management systems with immutable audit logs and retention policies that satisfy records-management and FOIA obligations by default.' },
    { icon: ShieldCheck, title: 'Zero-Trust Security Infrastructure', desc: 'Identity-verified access at every layer, encrypted data at rest and in transit, and continuous monitoring built for public-sector threat models.' },
    { icon: Eye, title: 'Explainable AI Decision Support', desc: 'AI-assisted recommendations that show their reasoning and evidence, so every automated decision is reviewable and appealable, not a black box.' },
    { icon: FileCheck, title: 'Compliance & Audit Reporting', desc: 'Automated generation of audit trails and compliance reports mapped to the specific regulatory framework your agency operates under.' },
    { icon: Landmark, title: 'Inter-Agency Data Integration', desc: 'Data-sharing pipelines between agencies that enforce access controls and consent boundaries instead of relying on manual data exports.' },
  ],
  features: [
    'Immutable audit logging on every automated action', 'Role-based, least-privilege access control',
    'FOIA & public-records retention compliance', 'Explainable AI with evidence trails',
    'Zero-trust network architecture', 'End-to-end encryption at rest and in transit',
    'Human-in-the-loop review for citizen-impacting decisions', 'Inter-agency data-sharing with consent controls',
    'Continuous compliance & security monitoring', 'Accessibility compliance (WCAG, Section 508)',
    'Legacy system integration without service disruption', 'Vendor-neutral, portable architecture',
  ],
  technologies: ['Python', 'Node.js', '.NET', 'PostgreSQL', 'AWS GovCloud', 'Azure Government', 'Kubernetes', 'OpenAI', 'LangChain', 'Terraform', 'OAuth2', 'SAML'],
};

export default function GovernmentPage() {
  return <IndustryPageTemplate data={pageData} />;
}
