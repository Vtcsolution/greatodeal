'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { Leaf, Zap, BarChart2, Cpu } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'Green Tech',
  subtitle: 'Compliance-Grade Energy AI',
  description: 'Energy and sustainability platforms sit at the intersection of grid regulation, environmental reporting, and safety compliance. We build AI-driven monitoring and automation systems for green-tech operators that need every reading, alert, and report to be auditable.',
  icon: Leaf,
  heroIcon: Leaf,
  stats: [
    { value: '24/7', label: 'Grid & Sensor Monitoring' },
    { value: '100%', label: 'Emissions Reporting Trail' },
    { value: 'Real-Time', label: 'Anomaly Detection' },
    { value: '9+', label: 'Years Infrastructure Exp.' },
  ],
  challenges: [
    'Regulatory reporting for emissions, energy usage, and environmental compliance',
    'Real-time monitoring of distributed sensors, smart grids, and field equipment',
    'Predictive maintenance to prevent costly and unsafe equipment failures',
    'Integrating legacy SCADA systems with modern cloud-based analytics',
    'Health, safety, and environmental (HSE) audit requirements across field operations',
    'Data integrity across thousands of distributed IoT and sensor endpoints',
  ],
  solutions: [
    { icon: Cpu, title: 'Smart Grid & SCADA Integration', desc: 'Cloud-connected monitoring layered on top of existing SCADA and field infrastructure, without ripping out what already works.' },
    { icon: BarChart2, title: 'Automated Compliance Reporting', desc: 'Emissions and energy-usage reporting generated automatically from live sensor data, with an audit trail mapped to regulatory frameworks.' },
    { icon: Zap, title: 'Predictive Maintenance AI', desc: 'Machine-learning models that flag equipment anomalies before failure, reducing downtime and safety incidents.' },
    { icon: Leaf, title: 'HSE Compliance Automation', desc: 'Field-operations tools that log safety checks and incidents in a format ready for HSE audit and regulatory review.' },
  ],
  features: [
    'Real-time sensor & SCADA monitoring', 'Automated emissions reporting', 'Predictive maintenance alerts',
    'HSE audit trail automation', 'Distributed IoT data integrity', 'Smart grid analytics dashboards',
  ],
  technologies: ['Python', 'Node.js', 'MQTT', 'TimescaleDB', 'AWS IoT', 'Azure', 'TensorFlow', 'Grafana'],
};

export default function GreenTechPage() {
  return <IndustryPageTemplate data={pageData} />;
}
