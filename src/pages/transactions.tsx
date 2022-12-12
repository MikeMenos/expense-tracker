import Layout from "../components/shared/Layout";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const Transactions: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  return (
    <Layout>
      <div>HELLO TRANSACTIONS</div>
    </Layout>
  );
};

export default Transactions;
