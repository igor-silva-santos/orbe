import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar conta — Orbe Nerd',
  description: 'Cadastre-se no Orbe Nerd para salvar sua Minha Lista, preferências e notificações.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/register' },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
