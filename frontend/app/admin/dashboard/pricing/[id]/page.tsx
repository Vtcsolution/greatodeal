'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { pricingApi } from '@/lib/api';
import PricingFormClient from '@/components/admin/PricingFormClient';
import type { PricingTier } from '@/types';

export default function EditPricingTierPage() {
  const params = useParams();
  const id = params.id as string;
  const [tier, setTier] = useState<PricingTier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pricingApi.getById(id)
      .then(res => setTier(res.data.data))
      .catch(() => setTier(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!tier) {
    return <div className="p-8 text-white/50">Pricing tier not found.</div>;
  }

  return <PricingFormClient tier={tier} />;
}
