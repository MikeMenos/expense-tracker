import { FC } from "react";
import Sidebar from "./Sidebar";
import { ChildrenType } from "../../interfaces/interfaces";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetPageTitle } from "../../hooks/useGetPageTitle";

const Layout: FC<ChildrenType> = ({ children }) => {
  const router = useRouter();
  const { title } = useGetPageTitle(router.pathname);

  return (
    <>
      <Head>
        <title>Expense Tracker | {title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
