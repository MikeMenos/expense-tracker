import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import TableDrawer from "../components/shared/AppDrawer";
import { trpc } from "../utils/trpc";
import type { Column, Row } from "react-table";
import { useQueryClient } from "@tanstack/react-query";
import DeleteButton from "../components/shared/buttons/DeleteButton";
import EditButton from "../components/shared/buttons/EditButton";
import { errorToast, successToast } from "../components/shared/toast/toasts";
import Loader from "../components/shared/Loader";
import CategoriesForm from "../components/Categories/CategoriesForm";

const Categories: NextPage = () => {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [record, setRecord] = useState<Row["original"]>({});

  const { data, isFetching } = trpc.category.list.useQuery();

  const categories = data?.categories.flatMap((name: any) => name) ?? [];

  useEffect(() => {
    if (status === "unauthenticated") void Router.replace("/signin");
  }, [status]);

  const { mutate: remove } = trpc.category.delete.useMutation({
    onSuccess: ({ name }: { name: string }) => {
      void queryClient.invalidateQueries().then(() => {
        successToast(`${name} was deleted successfully!`);
      });
    },
    onError: () => {
      errorToast("Oops, something went wrong!");
    },
  });

  const { mutate: createOrEdit } = trpc.category.createOrEdit.useMutation({
    onSuccess: ({ id }: { id: string }) => {
      successToast(
        `Category was ${id !== "" ? "updated" : "added"} successfully!`
      );
      onClose();
      queryClient.invalidateQueries();
    },
    onError: ({ message }: { message: any }) => {
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
    // @ts-ignore
    // modalToast(remove);
    void remove({ id: row.original.id });
  };

  const onClose = () => {
    setShowDrawer(false);
    setRecord({});
  };

  const categoryColumns: Column[] = [
    { Header: "Id", accessor: "id" },
    {
      Header: "Name",
      accessor: "name",
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

  const columns = useMemo(() => categoryColumns, []);

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
        <h1 className="mb-4">Categories</h1>
        <h3 className="mb-10 font-semibold text-purple">
          Manage your expense categories
        </h3>
        <Table
          // @ts-ignore
          columns={columns}
          data={categories}
          onAdd={onAdd}
          name="categories-table"
        />
        <TableDrawer show={showDrawer} onClose={onClose}>
          <CategoriesForm
            record={record}
            setRecord={setRecord}
            createOrEdit={createOrEdit}
          />
        </TableDrawer>
      </div>
    </Layout>
  );
};

export default Categories;
