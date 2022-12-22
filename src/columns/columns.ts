import type { Column } from "react-table";

export const transactionColumns: Column[] = [
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
];

export const categoryColumns: Column[] = [
  { Header: "Id", accessor: "id" },
  {
    accessor: "category",
    Header: "Name",
  },
];
