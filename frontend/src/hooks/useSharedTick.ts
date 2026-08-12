'use client';

import { useSyncExternalStore } from 'react';

type Listener = () => void;

const TICK_INTERVAL_MS = 1000;

let intervalId: ReturnType<typeof setInterval> | null = null;
let subscriberCount = 0;
let currentTick = Date.now();
const listeners = new Set<Listener>();

function tick() {
  currentTick = Date.now();
  listeners.forEach((listener) => listener());
}

/**
 * Assina o ticker global. Referencia-contado: o UNICO setInterval de fundo e criado
 * quando o primeiro assinante chega e destruido quando o ultimo sai. Antes deste hook,
 * cada card com contagem regressiva (MidiaCard/useCountdown) criava o proprio
 * setInterval de 1s -- com dezenas de cards de anime montados no carrossel da home,
 * isso virava dezenas de timers e re-renders por segundo, mesmo fora da viewport.
 */
function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  subscriberCount += 1;
  if (intervalId === null) {
    intervalId = setInterval(tick, TICK_INTERVAL_MS);
  }
  return () => {
    listeners.delete(listener);
    subscriberCount = Math.max(0, subscriberCount - 1);
    if (subscriberCount === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

// Mesmo comportamento do useState('') + useEffect que este hook substitui: nada de
// timestamp no HTML gerado no servidor (evita mismatch de hidratacao, ja que o relogio
// do servidor e do cliente nunca batem exatamente) -- o valor real so aparece apos
// montar no cliente, quando useSyncExternalStore troca pro snapshot real.
function getServerSnapshot(): number | null {
  return null;
}

/**
 * Retorna o timestamp compartilhado (atualizado a cada 1s por um unico timer global),
 * ou `null` antes de montar no cliente / durante SSR.
 *
 * `granularityMs` controla com que frequencia o CONSUMIDOR re-renderiza a partir do
 * mesmo tick de fundo -- o timer global continua batendo a cada 1s pra todo mundo, mas
 * um consumidor com `granularityMs` maior (ex.: 60_000) so ve o snapshot mudar (e so
 * re-renderiza) quando o timestamp cruza o proximo minuto, em vez de a cada segundo.
 * Uso tipico: countdown de anime com mais de 1 dia restante mostra "Xd Yh Zm", que so
 * precisa atualizar por minuto; ao cair para o formato HH:MM:SS (menos de 1 dia
 * restante) o consumidor troca pra granularityMs=1000 pra atualizar a cada segundo.
 */
export function useSharedTick(granularityMs: number = TICK_INTERVAL_MS): number | null {
  const getSnapshot = (): number | null => {
    if (granularityMs <= TICK_INTERVAL_MS) return currentTick;
    return Math.floor(currentTick / granularityMs) * granularityMs;
  };
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
