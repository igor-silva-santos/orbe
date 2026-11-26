export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'observation';

export type ExplorerIssue = {
  id: string;
  area: string;
  route: string;
  step: string;
  kind:
    | 'console.error'
    | 'pageerror'
    | 'request.failed'
    | 'request.http_error'
    | 'slow'
    | 'interaction'
    | 'missing_ui'
    | 'observation';
  severity: IssueSeverity;
  message: string;
  url?: string;
  durationMs?: number;
  timestamp: string;
};

export type ExplorerStepResult = {
  step: string;
  ok: boolean;
  durationMs: number;
  notes?: string;
};

export type ExplorerAreaReport = {
  area: string;
  baseUrl: string;
  startedAt: string;
  finishedAt: string;
  routesVisited: string[];
  steps: ExplorerStepResult[];
  issues: ExplorerIssue[];
  discoveredLinks: string[];
};

export type ExplorerFullReport = {
  version: 1;
  baseUrl: string;
  generatedAt: string;
  areas: ExplorerAreaReport[];
  summary: {
    totalIssues: number;
    bySeverity: Record<IssueSeverity, number>;
    byKind: Record<string, number>;
  };
};
