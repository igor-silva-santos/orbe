/**
 * Cloudflare Worker: pinga o Render SÓ enquanto o sync estiver ativo.
 *
 * - Cron a cada 5 min: se watching=1, consulta o status; se syncActive, pinga /api/health;
 *   se o sync acabou, zera watching (Render pode hibernar).
 * - POST /start (header x-sync-secret): liga watching, acorda a API e tenta resume.
 * - POST /stop: desliga watching na hora.
 *
 * Sem watching, o cron NÃO chama o Render — o PC não entra na jogada.
 */

const API_DEFAULT = "https://orbe-7bu0.onrender.com";

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(onCron(event, env));
  },

  async fetch(request, env) {
    if (request.method === "GET" && new URL(request.url).pathname === "/") {
      const watching = await isWatching(env);
      return json({ ok: true, watching });
    }

    if (!authorize(request, env)) {
      return new Response("unauthorized", { status: 401 });
    }

    const path = new URL(request.url).pathname;
    if (request.method === "POST" && path === "/start") {
      await setWatching(env, true);
      const result = await kickSync(env);
      return json({ watching: true, ...result });
    }
    if (request.method === "POST" && path === "/stop") {
      await setWatching(env, false);
      return json({ watching: false });
    }

    return new Response("not found", { status: 404 });
  },
};

function apiBase(env) {
  return String(env.ORBE_API_URL || API_DEFAULT).replace(/\/$/, "");
}

function authorize(request, env) {
  const expected = env.SYNC_SECRET;
  if (!expected) return false;
  const provided = request.headers.get("x-sync-secret") || "";
  return provided === expected;
}

async function isWatching(env) {
  if (!env.STATE) return false;
  return (await env.STATE.get("watching")) === "1";
}

async function setWatching(env, on) {
  if (!env.STATE) {
    throw new Error("KV STATE não configurado");
  }
  await env.STATE.put("watching", on ? "1" : "0");
}

async function onCron(event, env) {
  const daily =
    event.cron === "0 6 * * *" && String(env.ORBE_DAILY_START || "") === "true";
  if (daily) {
    await setWatching(env, true);
    await kickSync(env);
    return;
  }

  if (!(await isWatching(env))) {
    return;
  }

  const status = await getJson(env, "/api/sync/status");
  if (status.syncActive === true) {
    await getJson(env, "/api/health");
    return;
  }

  await setWatching(env, false);
}

async function kickSync(env) {
  await getJson(env, "/api/health");
  const status = await getJson(env, "/api/sync/status");
  if (status.syncActive === true) {
    return { action: "already_active", phase: status.phase || null };
  }
  if (status.resumeAvailable === true) {
    await postJson(env, "/api/run-sync-resume");
    return { action: "resume" };
  }
  return { action: "watch_only", message: "sem checkpoint; pinga se um sync começar" };
}

async function getJson(env, path) {
  const response = await fetch(`${apiBase(env)}${path}`, {
    headers: { Accept: "application/json", "User-Agent": "orbe-cf-sync-watch/1.0" },
  });
  if (!response.ok) {
    throw new Error(`${path} HTTP ${response.status}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function postJson(env, path) {
  const secret = env.SYNC_SECRET;
  if (!secret) {
    throw new Error("SYNC_SECRET ausente");
  }
  const response = await fetch(`${apiBase(env)}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-sync-secret": secret,
      "User-Agent": "orbe-cf-sync-watch/1.0",
    },
    body: "{}",
  });
  if (!response.ok) {
    throw new Error(`${path} HTTP ${response.status}`);
  }
}

function json(body) {
  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
}
