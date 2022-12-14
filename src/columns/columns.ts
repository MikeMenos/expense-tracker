import type { ColumnInterface } from "../interfaces/interfaces";

export const transactionColumns: ColumnInterface[] = [
  { text: "Id", dataField: "id", isKey: true, hidden: true },
  {
    dataField: "receiver",
    text: "Receiver",
  },
  {
    dataField: "category",
    text: "Category",
  },
  {
    dataField: "amount",
    text: "Amount",
  },
  {
    dataField: "date",
    text: "Date",
  },
];
