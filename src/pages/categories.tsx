import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/shared/Layout";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Table from "../components/shared/Table/Table";
import { categoryColumns } from "../columns/columns";
import TableDrawer from "../components/shared/Table/TableDrawer";
import ExpenseCategoriesForm from "../components/ExpenseCategories/ExpenseCategoriesForm";
import { trpc } from "../utils/trpc";

const Categories: NextPage = () => {
  const { status } = useSession();
  const [show, setShow] = useState<boolean>(false);

  const { data, isFetching } = trpc.category.list.useQuery();

  const categories = data?.categories.flatMap((category) => category) ?? [];

  const columns = useMemo(() => categoryColumns, []);

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

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <Layout>
      <div className="flex">
        <Table
          columns={columns}
          data={categories ?? []}
          onAdd={onAdd}
          // onEdit={dummy}
          // onDelete={dummy}
          name="categories-table"
        />
        <TableDrawer show={show} style={{ width: "50%" }} onClose={onClose}>
          <ExpenseCategoriesForm setShow={setShow} />
        </TableDrawer>
      </div>
    </Layout>
  );
};

export default Categories;
