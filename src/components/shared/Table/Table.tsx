import { type ReactElement, useState, type ChangeEvent } from "react";
import { useTable, useGlobalFilter } from "react-table";
import type { TableProps } from "../../../interfaces/interfaces";
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

  const handleFilterInputChange = (value: string) => {
    setGlobalFilter(value);
  };

  return (
    <div className="flex flex-grow flex-col">
      <ToolBar {...{ onAdd, globalFilter, handleFilterInputChange }} />
      <table {...getTableProps({ className: "mt-8" })}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              {...headerGroup.getHeaderGroupProps({
                className: "bg-purple",
              })}
              key={i}
            >
              {headerGroup.headers.map((column, x) => (
                <th
                  {...column.getHeaderProps({
                    style: { padding: "1rem 0 1rem 0" },
                  })}
                  key={x}
                >
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
                    <td
                      {...cell.getCellProps({
                        style: {
                          textAlign: "center",
                          padding: "1rem 0 1rem 0",
                        },
                      })}
                      key={x}
                    >
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
