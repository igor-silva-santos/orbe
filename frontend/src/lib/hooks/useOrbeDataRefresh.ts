import { useEffect } from 'react';

export const ORBE_DATA_REFRESH_EVENT = 'orbe:data-refresh';

/** Reexecuta callback quando um sync termina e o app dispara refresh global. */
export function useOrbeDataRefresh(onRefresh: () => void) {
  useEffect(() => {
    const handler = () => onRefresh();
    window.addEventListener(ORBE_DATA_REFRESH_EVENT, handler);
    return () => window.removeEventListener(ORBE_DATA_REFRESH_EVENT, handler);
  }, [onRefresh]);
}
