import type { NextPage } from "next";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import { transactionColumns } from "../columns/columns";
import TableDrawer from "../components/shared/Table/TableDrawer";

const Transactions: NextPage = () => {
  const { status } = useSession();

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

  const columns = useMemo(() => transactionColumns, []);
  const data = useMemo(() => sampleData, []);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  const dummy = () => {
    console.log("hello");
  };

  return (
    <Layout>
      <div className="flex">
        <Table
          columns={columns}
          data={data}
          onAdd={dummy}
          onEdit={dummy}
          onDelete={dummy}
          name="transactions-table"
        />
        <TableDrawer show={true}>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
        </TableDrawer>
      </div>
    </Layout>
  );
};

export default Transactions;
