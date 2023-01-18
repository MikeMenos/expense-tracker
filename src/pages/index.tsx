import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Layout from "../components/shared/Layout";
import Loader from "../components/shared/Loader";
import RecentTransactions from "../components/Transactions/RecentTransactions";

const Home: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading")
    return (
      <div className="flex h-screen w-full justify-center bg-main">
        <Loader />
      </div>
    );
  if (status === "unauthenticated") return null;

  return (
    <>
      <Layout>
        <div className="flex flex-col">
          <h1 className="mb-4">Welcome to your Dashboard!</h1>
          <div className="flex flex-grow">
            <div className="w-1/2 bg-red-500">Overview</div>
            <div className="ml-4 w-1/2">
              <div className="bg-yellow-500">Goals</div>
              <RecentTransactions />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
