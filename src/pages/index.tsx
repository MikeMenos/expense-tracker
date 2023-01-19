import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Layout from "../components/shared/Layout";
import Loader from "../components/shared/Loader";
import RecentTransactions from "../components/Transactions/RecentTransactions";
import Goals from "../components/Goals/Goals";
import Overview from "../components/Overview/Overview";
import GoalDrawer from "../components/Goals/GoalDrawer";

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
          <h1 className="mb-10">Welcome to your Dashboard!</h1>
          <div className="flex flex-grow">
            <div className="w-1/2">
              <Overview />
            </div>
            <div className="ml-4 w-1/2">
              <Goals />
              <RecentTransactions />
            </div>
          </div>
          {/*<GoalDrawer*/}
          {/*  title={title}*/}
          {/*  budget={budget}*/}
          {/*  setGoals={setGoals}*/}
          {/*  showCardDrawer={showCardDrawer}*/}
          {/*/>*/}
        </div>
      </Layout>
    </>
  );
};

export default Home;
