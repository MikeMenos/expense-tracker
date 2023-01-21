import type { NextPage } from "next";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import AppDrawer from "../components/shared/AppDrawer";
import type { Column, Row } from "react-table";
import EditButton from "../components/shared/buttons/EditButton";
import DeleteButton from "../components/shared/buttons/DeleteButton";
import Loader from "../components/shared/Loader";
import TransactionsForm from "../components/Transactions/TransactionsForm";
import { trpc } from "../utils/trpc";
import { errorToast, successToast } from "../components/shared/toast/toasts";
import { useQueryClient } from "@tanstack/react-query";
import { ConvertTZToDateTime } from "../components/utilComponents/ConvertTZToDateTime";

const Transactions: NextPage = () => {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [record, setRecord] = useState<Row["original"]>({});

  const { data, isFetching } = trpc.transaction.list.useQuery();

  const transactions = data?.transactions.flatMap((receiver) => receiver) ?? [];

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  const { mutate: remove } = trpc.transaction.delete.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries().then(() => {
        successToast(`Record was deleted successfully!`);
      });
    },
    onError: () => {
      errorToast("Oops, something went wrong!");
    },
  });

  const { mutate: createOrEdit } = trpc.transaction.createOrEdit.useMutation({
    onSuccess: ({ id }) => {
      successToast(
        `Category was ${id !== "" ? "updated" : "added"} successfully!`
      );
      onClose();
      queryClient.invalidateQueries();
    },
    onError: ({ message }) => {
      errorToast(
        JSON.parse(message)
          .map(({ message }: { message: string }) => message)
          .toString()
      );
    },
  });

  const onAdd = () => {
    setShowDrawer(true);
  };

  const onEdit = (row: Row) => {
    setRecord(row.original);
    setShowDrawer(true);
  };

  const onDelete = (row: Row) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void remove({ id: row.original.id });
  };

  const onClose = () => {
    setShowDrawer(false);
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
      Header: "Amount (€)",
    },
    {
      accessor: "createdAt",
      Header: "Date",
      Cell: ({ cell: { value } }) => <ConvertTZToDateTime date={value} />,
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

  if (isFetching)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="mb-4">Transactions</h1>
        <h3 className="mb-10 font-semibold text-purple">
          Manage your transactions
        </h3>
        <Table
          columns={columns}
          data={transactions}
          onAdd={onAdd}
          name="transactions-table"
        />
        <AppDrawer show={showDrawer} onClose={onClose}>
          <TransactionsForm
            record={record}
            setRecord={setRecord}
            createOrEdit={createOrEdit}
          />
        </AppDrawer>
      </div>
    </Layout>
  );
};

export default Transactions;
