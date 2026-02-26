// utils/toast.ts
import { toast as sonnerToast } from 'sonner';

export const customToast = {
  success: (message: string) =>
    sonnerToast.success(message, {
      style: { background: '#0A331F', color: '#FDFDFE', border: 'none' },
    }),

  error: (message: string) =>
    sonnerToast.error(message, {
      style: { background: '#960800', color: '#FDFDFE', border: 'none' },
    }),

  warning: (message: string) =>
    sonnerToast(message, {
      style: { background: '#fef9c3', color: '#92400e', border: 'none' },
    }),

  info: (message: string) =>
    sonnerToast(message, {
      style: { background: '#dbeafe', color: '#1e40af', border: 'none' },
    }),
};
