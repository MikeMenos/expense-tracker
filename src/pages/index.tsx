import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Layout from "../components/shared/Layout";
import Input from "../components/shared/Input";

const Home: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  return (
    <>
      <Layout>
        <div className="flex flex-col">
          <h1 className="mb-4">Welcome to your Dashboard!</h1>
          <div className="flex flex-grow">
            <div className="w-1/2 bg-red-500">Overview</div>
            <div className="w-1/2 bg-blue-500">
              <div className="bg-yellow-500">Goals</div>
              <div className="bg-green-500">Recent Transactions</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
