'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ApoiePixCopy({ pixKey }: { pixKey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <code className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm break-all font-mono">
        {pixKey}
      </code>
      <Button type="button" onClick={handleCopy} className="shrink-0">
        {copied ? 'Copiado!' : 'Copiar chave Pix'}
      </Button>
    </div>
  );
}
