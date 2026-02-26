// import Cookie from 'js-cookie';
// import { SidebarProvider } from '@/components/ui/sidebar';
// import { AppSidebar } from '@/components/layout/app-sidebar';
// import { ErrorBoundary } from 'react-error-boundary';
// import { PageProvider } from '@/providers/pageProvider';
// import { fallbackError } from '@/common/fallbackError';
// import Header from '@/components/layout/header/header';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   // Persisting the sidebar state in the cookie.
//   const defaultOpen = Cookie.get('sidebar:state') ? Cookie.get('sidebar:state') === 'true' : true;
//   return (

//     <div className="flex w-full">
//       <SidebarProvider defaultOpen={defaultOpen}>
//         <PageProvider>
//           <AppSidebar />

//           <div className="flex flex-1 flex-col overflow-hidden">
//             <Header showExpandButton={true} />

//             <ErrorBoundary
//               FallbackComponent={fallbackError}
//               onReset={() => {
//                 window.location.reload();
//               }}
//             >
//               <main className="flex-1 px-4 md:px-6 py-4 bg-neutral-25">{children}</main>
//             </ErrorBoundary>
//           </div>
//         </PageProvider>
//       </SidebarProvider>
//     </div>

//   );
// }

import Cookie from 'js-cookie';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { ErrorBoundary } from 'react-error-boundary';
import { PageProvider } from '@/providers/pageProvider';
import { fallbackError } from '@/common/fallbackError';
import Header from '@/components/layout/header/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const defaultOpen = Cookie.get('sidebar:state') ? Cookie.get('sidebar:state') === 'true' : true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <PageProvider>
        <div className="flex h-screen w-full bg-neutral-200 overflow-hidden">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main content area */}
          <div className="flex flex-col flex-1 min-h-full overflow-hidden">
            {/* Header */}
            <Header showExpandButton={true} />

            {/* Body */}
            <ErrorBoundary
              FallbackComponent={fallbackError}
              onReset={() => {
                window.location.reload();
              }}
            >
              <main className="flex-1 overflow-auto p-4 md:p-6 bg-[#F5FBFF]">{children}</main>
            </ErrorBoundary>
          </div>
        </div>
      </PageProvider>
    </SidebarProvider>
  );
}
