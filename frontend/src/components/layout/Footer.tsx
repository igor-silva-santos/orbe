'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navegacao: [
      { label: 'Filmes', href: '/filmes' },
      { label: 'Séries', href: '/series' },
      { label: 'Animes', href: '/animes' },
      { label: 'Jogos', href: '/jogos' },
      { label: 'Premiações', href: '/premios' },
      { label: 'Hoje', href: '/hoje' },
      { label: 'Apoie-nos', href: '/apoie' }
    ],
    suporte: [
      { label: 'Central de Ajuda', href: '/ajuda' },
      { label: 'Contato', href: '/contato' },
      { label: 'Reportar Bug', href: '/bug-report' },
      { label: 'Sugerir Conteúdo', href: '/sugestoes' }
    ],
    legal: [
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Política de Privacidade', href: '/privacidade' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'DMCA', href: '/dmca' }
    ]
  };

  return (
    <footer className="bg-background border-t-[3px] border-[var(--orbe-block-border)] mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Logo e Descrição */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full border-[3px] border-[var(--orbe-block-border)] bg-[var(--orbe-accent)] text-[var(--background)] font-display text-xs flex items-center justify-center">
                O
              </span>
              <h3 className="font-display text-xl orbe-text-primary">
                ORBE NERD
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Seu hub de estreias nerd. Descubra, acompanhe e organize 
              seus filmes, séries, animes e jogos favoritos em um só lugar.
            </p>
          </div>

          {/* Links de Navegação */}
          <div>
            <h4 className="font-semibold orbe-text-primary mb-4">Navegação</h4>
            <ul className="space-y-2">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:orbe-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links de Suporte */}
          <div>
            <h4 className="font-semibold orbe-text-primary mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:orbe-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Legais */}
          <div>
            <h4 className="font-semibold orbe-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:orbe-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} Orbe Nerd. Todos os direitos reservados.</span>
            </div>

            {/* Créditos */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>para a comunidade nerd</span>
              <span className="mx-1">•</span>
              <Link href="/apoie" className="text-rose-500 hover:text-rose-600 transition-colors">
                Apoie este projeto
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>
              Orbe Nerd é um agregador de informações de entretenimento. 
              Todas as imagens e informações pertencem aos seus respectivos proprietários.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

