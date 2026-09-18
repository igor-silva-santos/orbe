import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Server, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApoiePixCopy from '@/components/support/ApoiePixCopy';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Apoie o Orbe — Orbe Nerd',
  description: 'Ajude a manter o Orbe Nerd no ar: hospedagem, banco de dados e desenvolvimento.',
  alternates: { canonical: `${getSiteUrl()}/apoie` },
};

const COSTS = [
  { label: 'API (Render free)', detail: 'Cold start; mantida com monitor gratuito' },
  { label: 'Frontend (Vercel)', detail: 'Hospedagem do site' },
  { label: 'Banco (Supabase/Postgres)', detail: 'Watchlist e catálogo' },
];

export default function ApoiePage() {
  const pixKey = process.env.NEXT_PUBLIC_APOIE_PIX_KEY?.trim() || '';

  return (
    <div className="min-h-screen">
      <section className="border-b-4 border-primary bg-gradient-to-b from-accent/60 to-background">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Comunidade
            </span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Apoie o Orbe Nerd</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            O Orbe é um projeto independente. Sua contribuição ajuda a pagar infraestrutura e
            dedicar tempo ao desenvolvimento da extensão, PWA e novas funções.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Para onde vai o apoio
          </h2>
          <ul className="space-y-3">
            {COSTS.map((c) => (
              <li key={c.label} className="rounded-lg border p-4">
                <p className="font-semibold">{c.label}</p>
                <p className="text-sm text-muted-foreground">{c.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border-2 border-primary/20 bg-accent/30 p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Copy className="h-5 w-5 text-primary" />
            Pix
          </h2>
          {pixKey ? (
            <>
              <p className="text-sm text-muted-foreground">
                Copie a chave abaixo e transfira o valor que desejar. Qualquer valor ajuda — obrigado!
              </p>
              <ApoiePixCopy pixKey={pixKey} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Chave Pix em configuração. Defina{' '}
              <code className="text-xs bg-background px-1 rounded">NEXT_PUBLIC_APOIE_PIX_KEY</code>{' '}
              no deploy Vercel.
            </p>
          )}
        </section>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/extensao/crunchyroll">Conhecer a extensão</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ajuda">Ver FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
