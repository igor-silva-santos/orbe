import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar — Orbe Nerd',
  description: 'Faça login na sua conta Orbe Nerd para acessar Minha Lista e preferências.',
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
