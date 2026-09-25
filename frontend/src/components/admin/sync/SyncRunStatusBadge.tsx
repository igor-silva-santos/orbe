import { runStatusLabel, runStatusTone, type SyncRunStatus } from '@/lib/admin/syncPresentation';

const styles: Record<ReturnType<typeof runStatusTone>, string> = {
  success: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 ring-emerald-500/30',
  running: 'bg-blue-500/15 text-blue-800 dark:text-blue-200 ring-blue-500/30',
  danger: 'bg-red-500/15 text-red-800 dark:text-red-200 ring-red-500/30',
  warn: 'bg-amber-500/15 text-amber-900 dark:text-amber-100 ring-amber-500/30',
  muted: 'bg-muted text-muted-foreground ring-border',
};

export default function SyncRunStatusBadge({ status }: { status: SyncRunStatus }) {
  const tone = runStatusTone(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${styles[tone]}`}>
      {runStatusLabel(status)}
    </span>
  );
}
