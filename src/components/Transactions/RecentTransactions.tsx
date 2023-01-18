import Link from "next/link";
import { useMemo } from "react";
import { type Column } from "react-table";
import { trpc } from "../../utils/trpc";
import Loader from "../shared/Loader";
import Table from "../shared/Table/Table";
import { ConvertTZToDateTime } from "../utilComponents/ConvertTZToDateTime";
import { BiRightArrowAlt } from "react-icons/bi";

const RecentTransactions = () => {
  const { data, isFetching } = trpc.transaction.list.useQuery();
  const transactions =
    data?.transactions.flatMap((receiver) => receiver).slice(0, 10) ?? [];

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
  ];

  const columns = useMemo(() => transactionColumns, []);

  if (isFetching)
    return (
      <div className="p-10">
        <Loader width={50} height={50} />
      </div>
    );

  return (
    <div className="mt-4 rounded-md bg-secondary px-10 py-8">
      <h2>Recent Transactions</h2>
      <Table
        toolbarEnabled={false}
        columns={columns}
        data={transactions}
        name="transactions-table"
      />
      <div className="group mt-8 ml-auto flex w-28 cursor-pointer items-center justify-end rounded-lg border p-1">
        <Link href="/transactions" className="mx-auto font-semibold">
          View all
        </Link>
        <BiRightArrowAlt
          size="1.7rem"
          className="transition-all duration-100 group-hover:translate-x-1"
        />
      </div>
    </div>
  );
};

export default RecentTransactions;
