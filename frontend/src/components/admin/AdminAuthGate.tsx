'use client';

import { Loader2 } from 'lucide-react';
import { useRequireAdmin } from '@/lib/hooks/useRequireAdmin';

export default function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const { loading } = useRequireAdmin();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">Verificando acesso de administrador…</p>
      </div>
    );
  }

  return <>{children}</>;
}
