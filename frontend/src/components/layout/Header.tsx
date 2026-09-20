'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  List,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/stores/appStore';
import { removeToken } from '@/lib/api';
import type { HeaderProps } from '@/types';

type NavLink = { href: string; label: string };

const primaryLinks: NavLink[] = [
  { href: '/filmes', label: 'Filmes' },
  { href: '/series', label: 'Séries' },
  { href: '/animes', label: 'Animes' },
  { href: '/jogos', label: 'Jogos' },
  { href: '/continuacoes', label: 'Continuações' },
  { href: '/hoje', label: 'Hoje' },
];

const moreLinks: NavLink[] = [
  { href: '/promocoes', label: 'Promoções' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/jogos-em-alta', label: 'Jogos em Alta' },
  { href: '/premios', label: 'Premiações' },
];

const Header: React.FC<HeaderProps> = ({
  notificationCount = 0,
  onThemeToggle,
}) => {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const {
    openSearch,
    openNotificationModal,
    isAuthenticated,
    logout,
  } = useAppStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isActiveLink = (href: string) => pathname === href;
  const isMoreActive = moreLinks.some((link) => isActiveLink(link.href));

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSearchClick = () => {
    openSearch();
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = () => {
    openNotificationModal();
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    onThemeToggle?.();
  };

  const handleLogout = () => {
    removeToken();
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  const navLinkClass = (href: string) =>
    `text-[13.5px] transition-colors flex items-center px-3 py-2 rounded-full ${
      isActiveLink(href)
        ? 'text-primary font-semibold'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header className="header-fixed transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4 min-w-0">
            <Link
              href="/"
              className="flex items-center space-x-3 shrink-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo.svg"
                alt=""
                width={32}
                height={32}
                className="shrink-0"
                aria-hidden="true"
                priority
              />
              <span className="font-display text-lg md:text-[21px] orbe-text-primary whitespace-nowrap tracking-wide">
                ORBE NERD
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-0.5 min-w-0">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
              <div className="relative" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((v) => !v)}
                  className={`${navLinkClass('')} gap-1 ${isMoreActive ? 'text-primary font-semibold' : ''}`}
                >
                  Mais
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMoreOpen && (
                  <div className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-border bg-popover shadow-lg py-1 z-50">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2 text-sm hover:bg-muted ${
                          isActiveLink(link.href) ? 'text-primary font-medium' : 'text-foreground'
                        }`}
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSearchClick}
              className="w-10 h-10 flex items-center justify-center rounded-lg orbe-text-primary hover:bg-muted transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={handleThemeToggle}
              className="w-10 h-10 flex items-center justify-center rounded-lg orbe-text-primary hover:bg-muted transition-colors"
              title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={handleNotificationClick}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg orbe-text-primary hover:bg-muted transition-colors"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 orbe-text-primary hover:orbe-text-secondary transition-colors rounded-md hover:bg-muted"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/minha-lista"
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors orbe-text-primary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <List className="h-4 w-4 mr-2" />
                      Minha lista
                    </Link>
                    <Link
                      href="/perfil"
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors orbe-text-primary"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Meu Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium orbe-text-primary hover:orbe-text-secondary transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Inscreva-se
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 orbe-text-primary hover:orbe-text-secondary transition-colors rounded-md hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 bg-background/95 backdrop-blur-sm max-h-[70vh] overflow-y-auto">
            <div className="px-2 mb-4">
              <button
                onClick={handleSearchClick}
                className="flex w-full items-center space-x-2 px-3 py-2 text-sm text-muted-foreground bg-muted rounded-md hover:bg-muted/80 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Pesquisar...</span>
              </button>
            </div>

            <nav className="flex flex-col px-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">Catálogo</p>
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors px-3 py-2 rounded-md ${
                    isActiveLink(link.href)
                      ? 'orbe-text-secondary bg-muted'
                      : 'orbe-text-primary hover:orbe-text-secondary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <p className="px-3 py-1 mt-3 text-xs font-semibold uppercase text-muted-foreground">Descobrir</p>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors px-3 py-2 rounded-md ${
                    isActiveLink(link.href)
                      ? 'orbe-text-secondary bg-muted'
                      : 'orbe-text-primary hover:orbe-text-secondary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/minha-lista"
                      className="text-base font-medium orbe-text-primary hover:orbe-text-secondary transition-colors px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Minha lista
                    </Link>
                    <Link
                      href="/perfil"
                      className="text-base font-medium orbe-text-primary hover:orbe-text-secondary transition-colors px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Meu perfil
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-base font-medium orbe-text-primary hover:orbe-text-secondary transition-colors px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/register"
                      className="text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-3 py-2 rounded-md text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Inscreva-se
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {isUserMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;
