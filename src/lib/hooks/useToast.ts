import { writable, type Writable } from 'svelte/store';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export const toasts: Writable<Toast[]> = writable([]);

export function showToast(message: string, type: ToastType = 'info') {
  const id = Date.now();
  toasts.update((ts) => [...ts, { id, message, type }]);

  setTimeout(() => {
    toasts.update((ts) => ts.filter((t) => t.id !== id));
  }, 5000);
}
