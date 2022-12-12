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
        <div className="flex w-full flex-col py-10 px-8">
          <Input
            value={""}
            name={"search-transaction"}
            type="text"
            placeholder="Search Transaction..."
            className="mb-8 mr-0 ml-auto w-1/5 rounded-md border-2 p-2 outline-none"
          />

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
