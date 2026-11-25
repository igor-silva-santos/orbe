import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getToken } from '@/auth';

export function useRequireAuth(): { ready: boolean } {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const token = await getToken();
      if (cancelled) return;
      if (!token) {
        router.replace('/login');
        return;
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { ready };
}