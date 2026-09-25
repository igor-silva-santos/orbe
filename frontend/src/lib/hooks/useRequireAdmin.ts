'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import orbeNerdApi from '@/lib/api';

/** Redireciona para login ou perfil se o usuário não for admin. */
export function useRequireAdmin(): { loading: boolean; isAdmin: boolean } {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const profile = await orbeNerdApi.getUserProfile();
        if (cancelled) return;
        if (!profile || profile.role !== 'admin') {
          router.push('/perfil');
          return;
        }
        setIsAdmin(true);
        setLoading(false);
      } catch {
        if (!cancelled) router.push('/login');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { loading, isAdmin };
}
