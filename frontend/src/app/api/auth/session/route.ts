import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/session';
import { isValidSessionToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = typeof body?.token === 'string' ? body.token.trim() : '';

    // Verifica assinatura (nao so o formato de 3 partes) antes de gravar o
    // cookie httpOnly — ver lib/jwt.ts para o porque disso ser um gate de
    // UX e nao a autorizacao de verdade (essa mora na API Express).
    if (!(await isValidSessionToken(token))) {
      return NextResponse.json({ error: 'Token inválido.' }, { status: 400 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
