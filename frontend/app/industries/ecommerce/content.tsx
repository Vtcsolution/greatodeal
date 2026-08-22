'use client';

import IndustryPageTemplate, { IndustryPageData } from '@/components/IndustryPageTemplate';
import { ShoppingCart, Layers, Workflow, BarChart2, ShieldCheck } from 'lucide-react';

const pageData: IndustryPageData = {
  title: 'E-Commerce',
  subtitle: 'Inventory & Fulfillment Automation',
  description: 'Online retailers run on inventory accuracy and fulfillment speed, and both break down fast without the right systems. We build order management, inventory sync across channels, and fulfillment automation that scales with demand instead of falling over during it.',
  icon: ShoppingCart,
  heroIcon: ShoppingCart,
  stats: [
    { value: '99.9%', label: 'Inventory Accuracy' },
    { value: '100%', label: 'Order Audit Trail' },
    { value: 'Real-Time', label: 'Multi-Channel Sync' },
    { value: '24/7', label: 'Automated Fulfillment' },
  ],
  challenges: [
    'Inventory counts drift out of sync across multiple sales channels',
    'Order fulfillment is manually triaged instead of automatically routed',
    'Returns and refunds have no consistent, auditable process',
    'Demand spikes overwhelm systems built for average-day traffic',
    'Reporting across channels requires manually stitching together exports',
    'Customer data is scattered across storefront, CRM, and fulfillment tools',
  ],
  solutions: [
    { icon: Layers, title: 'Multi-Channel Inventory Sync', desc: 'Real-time inventory synced across your storefront, marketplaces, and warehouse so you never oversell.' },
    { icon: Workflow, title: 'Order & Fulfillment Automation', desc: 'Orders route automatically to the right fulfillment path, with exceptions flagged for human review, not lost in a queue.' },
    { icon: BarChart2, title: 'Unified Retail Dashboards', desc: 'Sales, inventory, and fulfillment data from every channel in one place, updated in real time.' },
    { icon: ShieldCheck, title: 'Returns & Refund Workflows', desc: 'Consistent, auditable returns processing that keeps inventory and accounting in sync automatically.' },
  ],
  features: [
    'Real-time multi-channel inventory synchronization', 'Automated order routing and fulfillment triggers',
    'Returns and refund workflow automation', 'Unified sales and inventory dashboards',
    'Demand-based inventory forecasting', 'Customer data unification across storefront and CRM',
    'Marketplace integrations (Amazon, eBay, Shopify)',
  ],
  technologies: ['Shopify', 'WooCommerce', 'Stripe', 'AWS', 'Node.js', 'PostgreSQL', 'Redis', 'Twilio', 'React'],
};

export default function EcommercePage() {
  return <IndustryPageTemplate data={pageData} />;
}
