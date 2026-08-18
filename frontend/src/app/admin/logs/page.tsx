'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ScrollText, Tag } from 'lucide-react';

export default function AdminLogsHubPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl space-y-6">
      <button
        type="button"
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar à home
      </button>

      <div>
        <h1 className="text-2xl font-bold">Logs internos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Diagnóstico de promoções e sincronização — persistidos no banco, fora do painel do Render.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/deals-logs"
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
        >
          <Tag className="h-6 w-6 text-primary mb-3" />
          <h2 className="font-semibold">Promoções</h2>
          <p className="text-sm text-muted-foreground mt-1">
            URLs aceitas/rejeitadas, motivos do filtro e histórico de refresh.
          </p>
        </Link>

        <Link
          href="/admin/sync-logs"
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
        >
          <ScrollText className="h-6 w-6 text-primary mb-3" />
          <h2 className="font-semibold">Sincronização</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Execuções de sync, skips, erros e eventos por fase.
          </p>
        </Link>
      </div>
    </div>
  );
}
