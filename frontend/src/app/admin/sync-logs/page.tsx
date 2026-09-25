'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  Flag,
  Loader2,
  RefreshCw,
  SkipForward,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '@/lib/apiBase';
import SyncRunStatusBadge from '@/components/admin/sync/SyncRunStatusBadge';

// ---------- Tipos ----------

type RunStatus = 'running' | 'completed' | 'failed' | 'interrupted' | string;

type SyncLogRunListItem = {
  id: number;
  startedAt: string;
  finishedAt: string | null;
  status: RunStatus;
  trigger: string | null;
  startDate: string | null;
  endDate: string | null;
  totalEvents: number;
  errorCount: number;
  skipCount: number;
};

type PhaseCounts = {
  sync: number;
  skip: number;
  error: number;
  checkpoint: number;
  summary: number;
};

type SyncLogRunSummary = {
  byPhase: Record<string, PhaseCounts>;
  byPhaseYearMonth: Record<string, Record<string, PhaseCounts>>;
  topErrors: { reason: string; count: number }[];
  topSkipReasons: { reason: string; count: number }[];
};

type SyncLogRunDetail = SyncLogRunListItem & {
  createdAt: string;
  summary: SyncLogRunSummary | null;
};

type SyncLogEvent = {
  id: string;
  runId: number;
  ts: string;
  level: 'info' | 'warn' | 'error' | string;
  category: 'sync' | 'skip' | 'error' | 'checkpoint' | 'summary' | string;
  phase: string | null;
  year: number | null;
  month: number | null;
  mediaType: string | null;
  itemId: string | null;
  itemTitle: string | null;
  reason: string | null;
  message: string;
};

type SelectedNode = { phase: string; year?: number; month?: number } | null;

const EMPTY_COUNTS: PhaseCounts = { sync: 0, skip: 0, error: 0, checkpoint: 0, summary: 0 };

// ---------- Helpers ----------

function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

async function authFetch(path: string): Promise<Response> {
  const token = getToken();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // resposta sem corpo JSON — mantém mensagem genérica
    }
    throw new Error(message);
  }
  return response;
}

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return value;
  }
}

const MONTH_NAMES = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

function monthLabel(month: number): string {
  return MONTH_NAMES[month - 1] || String(month);
}

function statusBadgeClass(status: RunStatus): string {
  switch (status) {
    case 'completed':
      return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300';
    case 'running':
      return 'bg-blue-500/10 border-blue-500/40 text-blue-700 dark:text-blue-300';
    case 'failed':
      return 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-300';
    case 'interrupted':
      return 'bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-300';
    default:
      return 'bg-secondary border-border text-secondary-foreground';
  }
}

function statusLabel(status: RunStatus): string {
  switch (status) {
    case 'completed': return 'Concluído';
    case 'running': return 'Em execução';
    case 'failed': return 'Falhou';
    case 'interrupted': return 'Interrompido';
    default: return status;
  }
}

const CATEGORY_META: Record<string, { icon: any; className: string; label: string }> = {
  sync: { icon: CheckCircle2, className: 'text-emerald-600 dark:text-emerald-400', label: 'sync' },
  skip: { icon: SkipForward, className: 'text-amber-600 dark:text-amber-400', label: 'skip' },
  error: { icon: XCircle, className: 'text-red-600 dark:text-red-400', label: 'erro' },
  checkpoint: { icon: Flag, className: 'text-blue-600 dark:text-blue-400', label: 'checkpoint' },
  summary: { icon: FileText, className: 'text-muted-foreground', label: 'resumo' },
};

function categoryMeta(category: string) {
  return CATEGORY_META[category] || { icon: FileText, className: 'text-muted-foreground', label: category };
}

// Monta a árvore fase -> ano -> (mês)[] a partir de summary.byPhaseYearMonth[phase]
type YearNode = { year: string; counts: PhaseCounts | null; months: { month: string; counts: PhaseCounts }[] };

function buildYearTree(ymMap: Record<string, PhaseCounts> | undefined): YearNode[] {
  if (!ymMap) return [];
  const years = new Map<string, YearNode>();
  for (const [ym, counts] of Object.entries(ymMap)) {
    const [yearPart, monthPart] = ym.split('-');
    if (!years.has(yearPart)) {
      years.set(yearPart, { year: yearPart, counts: null, months: [] });
    }
    const node = years.get(yearPart)!;
    if (monthPart) {
      node.months.push({ month: monthPart, counts });
    } else {
      node.counts = counts;
    }
  }
  const list = Array.from(years.values());
  list.sort((a, b) => a.year.localeCompare(b.year));
  for (const node of list) {
    node.months.sort((a, b) => a.month.localeCompare(b.month));
  }
  return list;
}

function sumCounts(counts: PhaseCounts[]): PhaseCounts {
  return counts.reduce(
    (acc, c) => ({
      sync: acc.sync + c.sync,
      skip: acc.skip + c.skip,
      error: acc.error + c.error,
      checkpoint: acc.checkpoint + c.checkpoint,
      summary: acc.summary + c.summary,
    }),
    { ...EMPTY_COUNTS },
  );
}

function CountsInline({ counts }: { counts: PhaseCounts }) {
  return (
    <span className="flex flex-wrap items-center gap-1.5 text-xs">
      {counts.sync > 0 && <span className="text-emerald-600 dark:text-emerald-400">{counts.sync} sync</span>}
      {counts.skip > 0 && <span className="text-amber-600 dark:text-amber-400">{counts.skip} skip</span>}
      {counts.error > 0 && <span className="text-red-600 dark:text-red-400">{counts.error} erro</span>}
      {counts.checkpoint > 0 && <span className="text-blue-600 dark:text-blue-400">{counts.checkpoint} checkpoint</span>}
      {counts.summary > 0 && <span className="text-muted-foreground">{counts.summary} resumo</span>}
      {counts.sync === 0 && counts.skip === 0 && counts.error === 0 && counts.checkpoint === 0 && counts.summary === 0 && (
        <span className="text-muted-foreground">sem eventos</span>
      )}
    </span>
  );
}

const EVENTS_PAGE_SIZE = 100;

export default function SyncLogsAdminPage() {
  const searchParams = useSearchParams();
  const runFromQuery = searchParams.get('run');

  // ---- Lista de execuções ----
  const [runs, setRuns] = useState<SyncLogRunListItem[]>([]);
  const [runsLoading, setRunsLoading] = useState(true);
  const [runsError, setRunsError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');

  // ---- Execução selecionada ----
  const [selectedRunId, setSelectedRunId] = useState<number | null>(null);
  const [runDetail, setRunDetail] = useState<SyncLogRunDetail | null>(null);
  const [runDetailLoading, setRunDetailLoading] = useState(false);
  const [runDetailError, setRunDetailError] = useState<string | null>(null);

  // ---- Árvore fase/ano/mês ----
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<SelectedNode>(null);

  // ---- Filtros de eventos ----
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  // ---- Eventos ----
  const [events, setEvents] = useState<SyncLogEvent[]>([]);
  const [eventsCursor, setEventsCursor] = useState<string | null>(null);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // ---- Export ----
  const [exporting, setExporting] = useState(false);

  // ---- Carrega lista de execuções ----
  const fetchRuns = useCallback(async () => {
    setRunsLoading(true);
    setRunsError(null);
    try {
      const params = new URLSearchParams({ limit: '30' });
      if (statusFilter) params.set('status', statusFilter);
      const response = await authFetch(`/sync/log-runs?${params.toString()}`);
      const data = await response.json();
      setRuns(data.runs || []);
    } catch (error: any) {
      setRunsError(error?.message || 'Erro ao carregar execuções.');
      toast.error('Não foi possível carregar as execuções de sync.');
    } finally {
      setRunsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  useEffect(() => {
    if (!runFromQuery || runs.length === 0) return;
    const id = parseInt(runFromQuery, 10);
    if (!Number.isNaN(id) && runs.some((r) => r.id === id)) {
      setSelectedRunId(id);
    }
  }, [runFromQuery, runs]);

  // ---- Carrega detalhe da execução selecionada ----
  const fetchRunDetail = useCallback(async (runId: number) => {
    setRunDetailLoading(true);
    setRunDetailError(null);
    try {
      const response = await authFetch(`/sync/log-runs/${runId}`);
      const data = await response.json();
      setRunDetail(data);
    } catch (error: any) {
      setRunDetailError(error?.message || 'Erro ao carregar detalhes da execução.');
      toast.error('Não foi possível carregar os detalhes desta execução.');
    } finally {
      setRunDetailLoading(false);
    }
  }, []);

  const handleSelectRun = (runId: number) => {
    if (selectedRunId === runId) return;
    setSelectedRunId(runId);
    setRunDetail(null);
    setExpandedPhases(new Set());
    setExpandedYears(new Set());
    setSelectedNode(null);
    setEvents([]);
    setEventsCursor(null);
    setEventsError(null);
    fetchRunDetail(runId);
  };

  // ---- Carrega eventos do recorte selecionado ----
  const fetchEvents = useCallback(
    async (append: boolean) => {
      if (!selectedRunId || !selectedNode) return;
      setEventsLoading(true);
      setEventsError(null);
      try {
        const params = new URLSearchParams({ limit: String(EVENTS_PAGE_SIZE) });
        params.set('phase', selectedNode.phase);
        if (selectedNode.year !== undefined) params.set('year', String(selectedNode.year));
        if (selectedNode.month !== undefined) params.set('month', String(selectedNode.month));
        if (filterCategory) params.set('category', filterCategory);
        if (filterLevel) params.set('level', filterLevel);
        if (append && eventsCursor) params.set('cursor', eventsCursor);

        const response = await authFetch(`/sync/log-runs/${selectedRunId}/events?${params.toString()}`);
        const data = await response.json();
        setEvents((prev) => (append ? [...prev, ...data.events] : data.events));
        setEventsCursor(data.nextCursor);
      } catch (error: any) {
        setEventsError(error?.message || 'Erro ao carregar eventos.');
        toast.error('Não foi possível carregar os eventos deste recorte.');
      } finally {
        setEventsLoading(false);
      }
    },
    [selectedRunId, selectedNode, filterCategory, filterLevel, eventsCursor],
  );

  // Refetch (do zero) sempre que o nó selecionado ou os filtros mudarem
  useEffect(() => {
    if (!selectedNode) return;
    setEvents([]);
    setEventsCursor(null);
    fetchEvents(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode, filterCategory, filterLevel]);

  const handleSelectNode = (node: SelectedNode) => {
    setSelectedNode(node);
  };

  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phase)) next.delete(phase);
      else next.add(phase);
      return next;
    });
  };

  const toggleYear = (key: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // ---- Export do recorte atual ----
  const handleExport = async () => {
    if (!selectedRunId) return;
    setExporting(true);
    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (selectedNode) {
        params.set('phase', selectedNode.phase);
        if (selectedNode.year !== undefined) params.set('year', String(selectedNode.year));
        if (selectedNode.month !== undefined) params.set('month', String(selectedNode.month));
      }
      if (filterCategory) params.set('category', filterCategory);
      if (filterLevel) params.set('level', filterLevel);

      const query = params.toString();
      const response = await fetch(
        `${API_BASE}/sync/log-runs/${selectedRunId}/export${query ? `?${query}` : ''}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      );
      if (!response.ok) throw new Error(`Falha ao exportar (${response.status})`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
      anchor.href = url;
      anchor.download = `orbe-sync-run-${selectedRunId}-${stamp}.ndjson`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar log:', error);
      toast.error('Não foi possível exportar este recorte.');
    } finally {
      setExporting(false);
    }
  };

  const phases = useMemo(() => {
    if (!runDetail?.summary) return [];
    const keys = new Set<string>([
      ...Object.keys(runDetail.summary.byPhase || {}),
      ...Object.keys(runDetail.summary.byPhaseYearMonth || {}),
    ]);
    return Array.from(keys).sort();
  }, [runDetail]);

  return (
    <AdminShell
      title="Histórico de sync"
      description="Execuções gravadas no banco — resumo por fase, árvore ano/mês e eventos para investigação."
    >
      <div className="space-y-6 -mt-2">
      {/* Lista de execuções */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 flex-wrap p-4 border-b border-border">
          <h2 className="font-semibold">Execuções recentes</h2>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm bg-background border border-border rounded-lg px-2 py-1.5"
            >
              <option value="">Todos os status</option>
              <option value="running">Em execução</option>
              <option value="completed">Concluído</option>
              <option value="failed">Falhou</option>
              <option value="interrupted">Interrompido</option>
            </select>
            <button
              type="button"
              onClick={() => fetchRuns()}
              disabled={runsLoading}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 bg-background border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${runsLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
        </div>

        {runsLoading && runs.length === 0 ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : runsError ? (
          <div className="p-6 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {runsError}
          </div>
        ) : runs.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">Nenhuma execução de sync registrada ainda.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Início</th>
                  <th className="px-4 py-2 font-medium">Fim</th>
                  <th className="px-4 py-2 font-medium">Gatilho</th>
                  <th className="px-4 py-2 font-medium">Período</th>
                  <th className="px-4 py-2 font-medium">Contadores</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr
                    key={run.id}
                    onClick={() => handleSelectRun(run.id)}
                    className={`border-b border-border last:border-b-0 cursor-pointer transition-colors hover:bg-muted/60 ${
                      selectedRunId === run.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="px-4 py-2 font-mono text-xs">#{run.id}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClass(run.status)}`}>
                        {statusLabel(run.status)}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(run.startedAt)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{formatDateTime(run.finishedAt)}</td>
                    <td className="px-4 py-2 text-muted-foreground">{run.trigger || '—'}</td>
                    <td className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                      {run.startDate || '—'} → {run.endDate || '—'}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">
                          {run.totalEvents.toLocaleString('pt-BR')} eventos
                        </span>
                        {run.errorCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-700 dark:text-red-300 text-xs">
                            {run.errorCount.toLocaleString('pt-BR')} erros
                          </span>
                        )}
                        {run.skipCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs">
                            {run.skipCount.toLocaleString('pt-BR')} pulados
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detalhe da execução */}
      {selectedRunId && (
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 space-y-6">
          {runDetailLoading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : runDetailError ? (
            <div className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {runDetailError}
            </div>
          ) : runDetail ? (
            <>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-semibold text-lg">Execução #{runDetail.id}</h2>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(runDetail.startedAt)} → {formatDateTime(runDetail.finishedAt)} · {runDetail.trigger || 'sem gatilho'}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadgeClass(runDetail.status)}`}>
                  {statusLabel(runDetail.status)}
                </span>
              </div>

              {!runDetail.summary ? (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                  Resumo ainda não disponível — esta execução está em andamento (o resumo é calculado ao finalizar).
                </div>
              ) : (
                <>
                  {/* Top erros / top skips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                      <h3 className="font-semibold text-sm mb-2 text-red-700 dark:text-red-300 flex items-center gap-1.5">
                        <XCircle className="h-4 w-4" /> Principais erros
                      </h3>
                      {runDetail.summary.topErrors.length === 0 ? (
                        <p className="text-xs text-muted-foreground">Nenhum erro registrado.</p>
                      ) : (
                        <ul className="space-y-1">
                          {runDetail.summary.topErrors.map((e, i) => (
                            <li key={i} className="flex items-center justify-between text-xs gap-2">
                              <span className="text-foreground/90">{e.reason}</span>
                              <span className="font-mono text-muted-foreground shrink-0">{e.count}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                      <h3 className="font-semibold text-sm mb-2 text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                        <SkipForward className="h-4 w-4" /> Principais motivos de skip
                      </h3>
                      {runDetail.summary.topSkipReasons.length === 0 ? (
                        <p className="text-xs text-muted-foreground">Nenhum item pulado.</p>
                      ) : (
                        <ul className="space-y-1">
                          {runDetail.summary.topSkipReasons.map((e, i) => (
                            <li key={i} className="flex items-center justify-between text-xs gap-2">
                              <span className="text-foreground/90">{e.reason}</span>
                              <span className="font-mono text-muted-foreground shrink-0">{e.count}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Resumo por fase */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Resumo por fase</h3>
                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-muted-foreground bg-muted/40">
                            <th className="px-3 py-1.5 font-medium">Fase</th>
                            <th className="px-3 py-1.5 font-medium">Sync</th>
                            <th className="px-3 py-1.5 font-medium">Skip</th>
                            <th className="px-3 py-1.5 font-medium">Erro</th>
                            <th className="px-3 py-1.5 font-medium">Checkpoint</th>
                            <th className="px-3 py-1.5 font-medium">Resumo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(runDetail.summary.byPhase).map(([phase, counts]) => (
                            <tr key={phase} className="border-t border-border">
                              <td className="px-3 py-1.5 font-medium">{phase}</td>
                              <td className="px-3 py-1.5 text-emerald-600 dark:text-emerald-400">{counts.sync}</td>
                              <td className="px-3 py-1.5 text-amber-600 dark:text-amber-400">{counts.skip}</td>
                              <td className="px-3 py-1.5 text-red-600 dark:text-red-400">{counts.error}</td>
                              <td className="px-3 py-1.5 text-blue-600 dark:text-blue-400">{counts.checkpoint}</td>
                              <td className="px-3 py-1.5 text-muted-foreground">{counts.summary}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Árvore fase -> ano -> mês */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Navegar por fase / ano / mês</h3>
                    <div className="rounded-lg border border-border divide-y divide-border">
                      {phases.length === 0 ? (
                        <div className="p-4 text-sm text-muted-foreground">Sem dados de fase para esta execução.</div>
                      ) : (
                        phases.map((phase) => {
                          const years = buildYearTree(runDetail.summary!.byPhaseYearMonth[phase]);
                          const phaseCounts = runDetail.summary!.byPhase[phase] || EMPTY_COUNTS;
                          const isExpanded = expandedPhases.has(phase);
                          return (
                            <div key={phase}>
                              <button
                                type="button"
                                onClick={() => togglePhase(phase)}
                                className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left hover:bg-muted/50 transition-colors"
                              >
                                <span className="flex items-center gap-1.5 font-medium text-sm">
                                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                  {phase}
                                </span>
                                <CountsInline counts={phaseCounts} />
                              </button>
                              {isExpanded && (
                                <div className="pl-6 pb-1">
                                  {years.length === 0 ? (
                                    <div className="px-3 py-2 text-xs text-muted-foreground">Sem detalhamento por ano/mês.</div>
                                  ) : (
                                    years.map((yearNode) => {
                                      const yearKey = `${phase}|${yearNode.year}`;
                                      const yearIsExpanded = expandedYears.has(yearKey);
                                      const isSelectedYear =
                                        selectedNode?.phase === phase &&
                                        selectedNode.year === Number(yearNode.year) &&
                                        selectedNode.month === undefined;
                                      const displayCounts = yearNode.counts ?? sumCounts(yearNode.months.map((m) => m.counts));
                                      return (
                                        <div key={yearKey}>
                                          <div
                                            className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-md text-sm ${
                                              isSelectedYear ? 'bg-primary/10' : 'hover:bg-muted/40'
                                            }`}
                                          >
                                            <button
                                              type="button"
                                              onClick={() => handleSelectNode({ phase, year: Number(yearNode.year) })}
                                              className="flex-1 text-left flex items-center gap-1.5"
                                            >
                                              {yearNode.months.length > 0 && (
                                                <span
                                                  role="button"
                                                  tabIndex={-1}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleYear(yearKey);
                                                  }}
                                                  className="p-0.5 -ml-1 rounded hover:bg-muted"
                                                >
                                                  {yearIsExpanded ? (
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                  ) : (
                                                    <ChevronRight className="h-3.5 w-3.5" />
                                                  )}
                                                </span>
                                              )}
                                              {yearNode.year}
                                            </button>
                                            <CountsInline counts={displayCounts} />
                                          </div>
                                          {yearIsExpanded && yearNode.months.length > 0 && (
                                            <div className="pl-6">
                                              {yearNode.months.map((m) => {
                                                const monthNum = Number(m.month);
                                                const isSelectedMonth =
                                                  selectedNode?.phase === phase &&
                                                  selectedNode.year === Number(yearNode.year) &&
                                                  selectedNode.month === monthNum;
                                                return (
                                                  <button
                                                    key={m.month}
                                                    type="button"
                                                    onClick={() =>
                                                      handleSelectNode({ phase, year: Number(yearNode.year), month: monthNum })
                                                    }
                                                    className={`w-full flex items-center justify-between gap-3 px-3 py-1.5 rounded-md text-sm text-left ${
                                                      isSelectedMonth ? 'bg-primary/10' : 'hover:bg-muted/40'
                                                    }`}
                                                  >
                                                    <span>{monthLabel(monthNum)}</span>
                                                    <CountsInline counts={m.counts} />
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Eventos do recorte selecionado */}
                  <div>
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                      <h3 className="font-semibold text-sm">
                        Eventos
                        {selectedNode && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            {selectedNode.phase}
                            {selectedNode.year !== undefined ? ` · ${selectedNode.year}` : ''}
                            {selectedNode.month !== undefined ? `-${String(selectedNode.month).padStart(2, '0')}` : ''}
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="text-xs bg-background border border-border rounded-lg px-2 py-1"
                        >
                          <option value="">Todas categorias</option>
                          <option value="sync">sync</option>
                          <option value="skip">skip</option>
                          <option value="error">error</option>
                          <option value="checkpoint">checkpoint</option>
                          <option value="summary">summary</option>
                        </select>
                        <select
                          value={filterLevel}
                          onChange={(e) => setFilterLevel(e.target.value)}
                          className="text-xs bg-background border border-border rounded-lg px-2 py-1"
                        >
                          <option value="">Todos níveis</option>
                          <option value="info">info</option>
                          <option value="warn">warn</option>
                          <option value="error">error</option>
                        </select>
                        <button
                          type="button"
                          onClick={handleExport}
                          disabled={exporting}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {exporting ? 'Exportando...' : 'Exportar este recorte'}
                        </button>
                      </div>
                    </div>

                    {!selectedNode ? (
                      <div className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-4">
                        Selecione uma fase/ano/mês na árvore acima para ver os eventos, ou use apenas os filtros e o botão
                        &ldquo;Exportar&rdquo; para baixar o recorte da execução inteira.
                      </div>
                    ) : (
                      <div className="rounded-lg border border-border divide-y divide-border max-h-[32rem] overflow-y-auto">
                        {eventsError ? (
                          <div className="p-4 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            {eventsError}
                          </div>
                        ) : events.length === 0 && !eventsLoading ? (
                          <div className="p-4 text-sm text-muted-foreground">Nenhum evento encontrado para este recorte/filtro.</div>
                        ) : (
                          events.map((ev) => {
                            const meta = categoryMeta(ev.category);
                            const Icon = meta.icon;
                            return (
                              <div key={ev.id} className="flex items-start gap-2.5 px-3 py-2 text-sm">
                                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${meta.className}`} />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                                    <span className={`font-medium ${meta.className}`}>{meta.label}</span>
                                    {ev.mediaType && <span>· {ev.mediaType}</span>}
                                    <span>· {formatDateTime(ev.ts)}</span>
                                  </div>
                                  {ev.itemTitle && <div className="font-medium truncate">{ev.itemTitle}</div>}
                                  {ev.reason && (
                                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-xs">
                                      {ev.reason}
                                    </span>
                                  )}
                                  <div className="text-foreground/80 break-words mt-0.5">{ev.message}</div>
                                </div>
                              </div>
                            );
                          })
                        )}
                        {eventsLoading && (
                          <div className="p-4 flex justify-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedNode && eventsCursor && !eventsLoading && (
                      <div className="flex justify-center mt-3">
                        <button
                          type="button"
                          onClick={() => fetchEvents(true)}
                          className="text-sm px-4 py-1.5 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          Carregar mais
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : null}
        </div>
      )}
      </div>
    </AdminShell>
  );
}
