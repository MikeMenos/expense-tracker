import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ProSidebarProvider } from "react-pro-sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ProSidebarProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </ProSidebarProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
