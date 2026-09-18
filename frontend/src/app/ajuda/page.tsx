import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, PlugZap } from 'lucide-react';
import { AJUDA_FAQ } from '@/content/ajuda-faq';
import { Button } from '@/components/ui/button';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata: Metadata = {
  title: 'Ajuda — Orbe Nerd',
  description: 'FAQ sobre login, extensão Crunchyroll, sync da watchlist e notificações.',
  alternates: { canonical: `${getSiteUrl()}/ajuda` },
};

export default function AjudaPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b-4 border-primary bg-gradient-to-b from-accent/60 to-background">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-10 w-10 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Suporte</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">Central de Ajuda</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Respostas rápidas sobre conta, extensão e Minha Lista.
          </p>
          <Button asChild variant="outline">
            <Link href="/extensao/crunchyroll" className="inline-flex items-center gap-2">
              <PlugZap className="h-4 w-4" />
              Guia da extensão Crunchyroll
            </Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-4">
        {AJUDA_FAQ.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border bg-card p-5 open:border-primary/30"
          >
            <summary className="cursor-pointer font-semibold list-none flex justify-between items-center">
              {item.question}
              <span className="text-muted-foreground text-sm group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
          </details>
        ))}

        <p className="text-sm text-muted-foreground pt-8 border-t">
          Ainda com dúvida?{' '}
          <Link href="/apoie" className="text-primary font-semibold hover:underline">
            Apoie o projeto
          </Link>{' '}
          e nos ajude a melhorar o suporte.
        </p>
      </div>
    </div>
  );
}
