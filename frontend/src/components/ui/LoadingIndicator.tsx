'use client';

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

export function LoadingIndicator({
  message = 'Carregando...',
  className = '',
  size = 'md',
}: LoadingIndicatorProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status" aria-live="polite">
      <div className={`relative ${sizeClasses[size]}`} aria-hidden>
        <div className="absolute inset-0 rounded-full border-2 border-primary/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/50 animate-spin" />
        <div className="absolute inset-[22%] rounded-full border-2 border-transparent border-b-primary/80 animate-[spin_0.6s_linear_infinite_reverse]" />
      </div>
      {message && <p className="text-sm text-muted-foreground text-center max-w-xs">{message}</p>}
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export function LoadingOverlay({ message = 'Carregando...', className = '' }: LoadingOverlayProps) {
  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center bg-background/85 backdrop-blur-[2px] ${className}`}
      aria-busy="true"
      aria-live="polite"
    >
      <LoadingIndicator message={message} />
    </div>
  );
}
