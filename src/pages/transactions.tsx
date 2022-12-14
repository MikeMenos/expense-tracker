import type { NextPage } from "next";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Table from "../components/shared/Table";
import { transactionColumns } from "../columns/columns";

const Transactions: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  const sampleData = [
    {
      id: "hello",
      receiver: "jkuukuiku",
      category: "qwwefweew",
      amount: 1234,
      date: "3dfhgfrhrfgthrf",
    },
    {
      id: "hello2",
      receiver: "defgefdge",
      category: "dfgdfegferge",
      amount: 4564565,
      date: "efdgertghretgh",
    },
  ];

  return (
    <Layout>
      <Table keyField="id" columns={transactionColumns} data={sampleData} />
    </Layout>
  );
};

export default Transactions;
