'use client';

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Check, MoreVertical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UserAction } from '@/types';

export type CardMenuAction = {
  icon: LucideIcon;
  label: string;
  action: UserAction;
  active: boolean;
  disabled?: boolean;
};

const UNDO_LABEL: Partial<Record<UserAction, string>> = {
  favoritar: 'Remover dos favoritos',
  quero_assistir: 'Tirar de quero assistir',
  acompanhando: 'Parar de acompanhar',
  ja_assisti: 'Desmarcar já assisti',
  ja_joguei: 'Desmarcar já joguei',
  nao_me_interessa: 'Voltar a me interessar',
  toggle_semana_anime: 'Remover da semana',
};

type Props = {
  title: string;
  actions: CardMenuAction[];
  raised?: boolean;
  onAction: (action: UserAction, active: boolean) => void;
};

const isNarrowViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

/**
 * O menu precisa viver fora do card: o pôster usa overflow hidden e os
 * carrosséis capturam o toque, então o clique na opção se perdia no celular.
 * Em tela estreita abre uma folha embaixo, com alvos grandes e a opção de desfazer.
 */
export default function CardActionMenu({ title, actions, raised = false, onAction }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [anchor, setAnchor] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    const stop = (event: Event) => event.stopPropagation();
    button.addEventListener('pointerdown', stop);
    return () => button.removeEventListener('pointerdown', stop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    if (sheet) document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, sheet]);

  const toggle = (event: ReactMouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (open) {
      setOpen(false);
      return;
    }
    const narrow = isNarrowViewport();
    setSheet(narrow);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect && !narrow) {
      const width = 240;
      const left = Math.min(Math.max(8, rect.right - width), window.innerWidth - width - 8);
      const estimated = actions.length * 48 + 56;
      let top = rect.bottom + 6;
      if (top + estimated > window.innerHeight - 8) {
        top = Math.max(8, rect.top - estimated - 6);
      }
      setAnchor({ top, left });
    }
    setOpen(true);
  };

  const choose = (event: ReactMouseEvent, action: CardMenuAction) => {
    event.stopPropagation();
    event.preventDefault();
    if (action.disabled) return;
    setOpen(false);
    onAction(action.action, action.active);
  };

  const rows = (large: boolean) =>
    actions.map((action) => {
      const Icon = action.icon;
      const text = action.active ? (UNDO_LABEL[action.action] ?? action.label) : action.label;
      return (
        <button
          key={action.action}
          type="button"
          disabled={action.disabled}
          onClick={(event) => choose(event, action)}
          className={`flex w-full items-center gap-3 text-left transition-colors ${
            large ? 'min-h-12 rounded-xl px-3 py-3 text-base' : 'px-3 py-2.5 text-sm'
          } ${
            action.disabled
              ? 'cursor-not-allowed text-muted-foreground opacity-50'
              : 'hover:bg-muted active:bg-muted'
          } ${action.active ? 'text-primary font-semibold' : 'text-foreground'}`}
        >
          <Icon className={large ? 'h-5 w-5 shrink-0' : 'h-4 w-4 shrink-0'} />
          <span className="min-w-0 flex-1">{text}</span>
          {action.active && <Check className="h-4 w-4 shrink-0" aria-hidden />}
        </button>
      );
    });

  const menu = open
    ? createPortal(
        sheet ? (
          <div className="fixed inset-0 z-[80]" role="presentation">
            <button
              type="button"
              aria-label="Fechar menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <div
              role="menu"
              aria-label={`Ações de ${title}`}
              className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border border-border bg-popover px-2 pt-3 shadow-2xl"
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-muted" />
              <p className="px-3 pb-1 text-sm font-semibold leading-snug text-foreground break-words">
                {title}
              </p>
              <p className="px-3 pb-2 text-xs text-muted-foreground">
                Toque de novo na opção marcada para desfazer.
              </p>
              {rows(true)}
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-[79] cursor-default"
              onClick={() => setOpen(false)}
            />
            <div
              role="menu"
              aria-label={`Ações de ${title}`}
              className="fixed z-[80] w-60 rounded-md border border-border bg-popover py-1 shadow-lg"
              style={{ top: anchor.top, left: anchor.left }}
            >
              <p className="px-3 py-1.5 text-[11px] text-muted-foreground">
                Clique de novo para desfazer
              </p>
              {rows(false)}
            </div>
          </>
        ),
        document.body,
      )
    : null;

  return (
    <div className={`absolute right-2 z-30 ${raised ? 'top-10' : 'top-2'}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className="bg-black/55 text-white p-2 sm:p-1.5 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
        aria-label="Ações do card"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {menu}
    </div>
  );
}
