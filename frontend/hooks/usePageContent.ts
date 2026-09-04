'use client';

import { useState, useEffect } from 'react';
import { pageContentApi } from '@/lib/api';

/**
 * Merges admin-edited overrides (from the Page Content admin section) over a page's
 * own hardcoded default copy. Empty/unset fields silently fall back to the default,
 * so a page never renders blank text even before an admin has touched it.
 */
export function usePageContent<T extends Record<string, string>>(page: string, defaults: T): T {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    pageContentApi.getPublic(page)
      .then(res => { if (!cancelled) setOverrides(res.data?.data || {}); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [page]);

  const merged = { ...defaults };
  (Object.keys(defaults) as (keyof T)[]).forEach(key => {
    const override = overrides[key as string];
    if (override && override.trim()) merged[key] = override as T[keyof T];
  });
  return merged;
}
