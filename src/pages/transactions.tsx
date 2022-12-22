import type { NextPage } from "next";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import { transactionColumns } from "../columns/columns";
import TableDrawer from "../components/shared/Table/TableDrawer";
import Button from "../components/shared/Button";
import { GrClose } from "react-icons/gr";

const Transactions: NextPage = () => {
  const { status } = useSession();
  const [show, setShow] = useState<boolean>(false);

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

  const onAdd = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <Layout>
      <div className="flex">
        <Table
          columns={columns}
          data={data}
          onAdd={onAdd}
          // onEdit={dummy}
          // onDelete={dummy}
          name="transactions-table"
        />
        <TableDrawer show={show} style={{ width: "50%" }} onClose={onClose}>
          <h1>hello</h1>
        </TableDrawer>
      </div>
    </Layout>
  );
};

export default Transactions;
