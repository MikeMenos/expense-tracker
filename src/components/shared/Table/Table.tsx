import { type ReactElement, useState, type ChangeEvent } from "react";
import { useTable, useGlobalFilter } from "react-table";
import type { TableProps } from "../../../interfaces/interfaces";
import Input from "../Input";
import ToolBar from "./Toolbar";

function Table<T extends object>({
  columns,
  data,
  name,
  onAdd,
}: TableProps<T>): ReactElement {
  const [globalFilter, setGlobalFilter] = useState("");
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>(
      {
        columns,
        data,
        initialState: {
          hiddenColumns: ["id"],
        },
      },
      useGlobalFilter
    );

  const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
  };

  return (
    <div className="flex flex-grow flex-col">
      <ToolBar {...{ onAdd }} />
      <Input
        placeholder="Filter"
        onChange={handleFilterInputChange}
        value={globalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, x) => (
                <th {...column.getHeaderProps()} key={x}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, x) => {
                  return (
                    <td {...cell.getCellProps()} key={x}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
