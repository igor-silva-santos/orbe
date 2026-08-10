import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, getSessionCookieOptions } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = typeof body?.token === 'string' ? body.token.trim() : '';

    if (!token || token.split('.').length !== 3) {
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
