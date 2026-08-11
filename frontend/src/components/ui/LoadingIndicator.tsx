'use client';

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function LoadingIndicator({
  message = 'Carregando...',
  className = '',
  size = 'md',
}: LoadingIndicatorProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status" aria-live="polite">
      <div
        className={`${sizeClasses[size]} rounded-full border-primary border-t-transparent animate-spin`}
        aria-hidden
      />
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
