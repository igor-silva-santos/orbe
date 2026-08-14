function resolveApiOrigin(): string | null {
  const fromProxy = process.env.API_PROXY_ORIGIN?.replace(/\/$/, '');
  if (fromProxy) return fromProxy;

  const fromPublic = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '').replace(/\/$/, '');
  if (fromPublic) return fromPublic;

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3001';
  }

  return null;
}

export async function proxyApiGet(path: string): Promise<Response> {
  const origin = resolveApiOrigin();
  if (!origin) {
    return Response.json(
      { syncActive: false, stale: false, resumeAvailable: false, interrupted: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const url = `${origin}/api/${path.replace(/^\//, '')}`;
  const upstream = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
