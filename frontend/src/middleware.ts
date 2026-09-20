import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/session';
import { isValidSessionToken } from '@/lib/jwt';

const PROTECTED_PREFIXES = ['/perfil', '/configuracoes', '/minha-lista'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // Valida a assinatura do JWT (nao so a presenca do cookie) — ver
  // lib/jwt.ts para o porque disso ser um gate de UX, nao de autorizacao.
  if (!session || !(await isValidSessionToken(session))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/perfil/:path*', '/configuracoes/:path*', '/minha-lista/:path*'],
};
