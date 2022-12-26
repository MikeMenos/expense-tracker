import type { NextPage } from "next";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import TableDrawer from "../components/shared/Table/TableDrawer";
import type { Column, Row } from "react-table";
import EditButton from "../components/shared/buttons/EditButton";
import DeleteButton from "../components/shared/buttons/DeleteButton";
import Loader from "../components/shared/Loader";
import TransactionsForm from "../components/Transactions/TransactionsForm";

const Transactions: NextPage = () => {
  const { status } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [record, setRecord] = useState<Row["original"]>({});

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

  const data = useMemo(() => sampleData, []);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  const onAdd = () => {
    setShow(true);
  };

  const onEdit = (row: Row) => {
    setRecord(row.original);
    setShow(true);
  };

  const onDelete = (row: Row) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void removeCategory({ id: row.original.id });
  };

  const onClose = () => {
    setShow(false);
    setRecord({});
  };

  const transactionColumns: Column[] = [
    { Header: "Id", accessor: "id" },
    {
      accessor: "receiver",
      Header: "Receiver",
    },
    {
      accessor: "category",
      Header: "Category",
    },
    {
      accessor: "amount",
      Header: "Amount",
    },
    {
      accessor: "date",
      Header: "Date",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <EditButton onClick={() => onEdit(row)} onlyIcon className="mr-3" />
          <DeleteButton
            onClick={() => onDelete(row)}
            onlyIcon
            className="ml-3"
          />
        </>
      ),
    },
  ];

  const columns = useMemo(() => transactionColumns, []);

  if (status === "loading")
    return (
      <div className="flex h-screen w-full justify-center bg-main">
        <Loader />
      </div>
    );
  if (status === "unauthenticated") return null;

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="mb-4">Transactions</h1>
        <h3 className="mb-10 font-semibold text-purple">
          Manage your transactions
        </h3>
        <Table
          columns={columns}
          data={data}
          onAdd={onAdd}
          name="transactions-table"
        />
        <TableDrawer show={show} onClose={onClose}>
          <TransactionsForm record={record} setRecord={setRecord} />
        </TableDrawer>
      </div>
    </Layout>
  );
};

export default Transactions;
