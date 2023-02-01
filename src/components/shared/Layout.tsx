import type { FC } from "react";
import Sidebar from "./Sidebar";
import type { ChildrenType } from "../../interfaces/interfaces";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetPageTitle } from "../../hooks/useGetPageTitle";
import { useProSidebar } from "react-pro-sidebar";

const Layout: FC<ChildrenType> = ({ children }) => {
  const router = useRouter();
  const { title } = useGetPageTitle(router.pathname);
  const { collapseSidebar, collapsed } = useProSidebar();

  const collapseSidebarFunc = () => {
    collapseSidebar();
  };
  return (
    <>
      <Head>
        <title>Expense Tracker | {title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Sidebar
          // @ts-ignore
          collapseSidebarFunc={collapseSidebarFunc}
          collapsed={collapsed}
        />
        <div
          className={`ml-auto min-h-[100vh] ${
            collapsed ? "sidebarCollapsed" : "sidebarExtended"
          } bg-main p-10`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
