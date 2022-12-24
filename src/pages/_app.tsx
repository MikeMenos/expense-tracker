import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import "react-modern-drawer/dist/index.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ProSidebarProvider>
          <main>
            <Component {...pageProps} />
            <Toaster />
          </main>
        </ProSidebarProvider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
