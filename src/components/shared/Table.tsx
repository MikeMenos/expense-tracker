import type { FC } from "react";
import type { TableInterface } from "../../interfaces/interfaces";
import BootstrapTable from "react-bootstrap-table-next";

const Table: FC<TableInterface> = ({ columns, data, keyField }) => {
  return (
    <BootstrapTable
      keyField={keyField}
      data={data || []}
      columns={columns}
      striped
      condensed
    />
  );
};

export default Table;
