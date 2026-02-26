import { fallbackError } from '@/common/fallbackError';
import { ErrorBoundary } from 'react-error-boundary';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'overflow-hidden'}>
      <ErrorBoundary
        FallbackComponent={fallbackError}
        onReset={() => {
          // Optional: reset global state, clear cache, or reload page
          window.location.reload();
        }}
      >
        <main>{children}</main>
      </ErrorBoundary>
    </div>
  );
}
