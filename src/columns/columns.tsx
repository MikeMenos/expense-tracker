import type { Column } from "react-table";
import Button from "../components/shared/Button";
import { AiFillDelete } from "react-icons/ai";

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
  {
    Header: "Delete",
    accessor: () => "delete",
    Cell: (tableProps) => (
      <Button icon={<AiFillDelete size="1.5rem" color="red" />} />
    ),
  },
];
