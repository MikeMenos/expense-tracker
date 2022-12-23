import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import TableDrawer from "../components/shared/Table/TableDrawer";
import ExpenseCategoriesForm from "../components/ExpenseCategories/ExpenseCategoriesForm";
import { trpc } from "../utils/trpc";
import type { Column, Row } from "react-table";
import Button from "../components/shared/Button";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

const Categories: NextPage = () => {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const [show, setShow] = useState<boolean>(false);
  const [record, setRecord] = useState<Row["original"]>({});

  const { data, isFetching } = trpc.category.list.useQuery();

  const categories = data?.categories.flatMap((category) => category) ?? [];

  useEffect(() => {
    if (status === "unauthenticated") void Router.replace("/signin");
  }, [status]);

  const removeCategory = trpc.category.remove.useMutation({
    onSuccess: () => {
      void queryClient.refetchQueries();
    },
  }).mutateAsync;

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

  const categoryColumns: Column[] = [
    { Header: "Id", accessor: "id" },
    {
      accessor: "category",
      Header: "Name",
    },
    {
      Header: "Delete",
      accessor: "delete",
      Cell: ({ row }) => (
        <Button
          onClick={() => onDelete(row)}
          icon={<AiFillDelete size="1.5rem" color="red" />}
        />
      ),
    },
    {
      Header: "Edit",
      accessor: "edit",
      Cell: ({ row }) => (
        <Button
          onClick={() => onEdit(row)}
          icon={<AiFillEdit size="1.5rem" />}
        />
      ),
    },
  ];

  const columns = useMemo(() => categoryColumns, []);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <Layout>
      <div className="flex">
        <Table
          columns={columns}
          data={categories}
          onAdd={onAdd}
          name="categories-table"
        />
        <TableDrawer show={show} style={{ width: "50%" }} onClose={onClose}>
          <ExpenseCategoriesForm
            record={record}
            setRecord={setRecord}
            setShow={setShow}
            queryClient={queryClient}
          />
        </TableDrawer>
      </div>
    </Layout>
  );
};

export default Categories;
