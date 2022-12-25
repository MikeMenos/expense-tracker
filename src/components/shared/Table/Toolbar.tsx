import {
  type MouseEvent,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useState,
} from "react";
import type { TableInstance } from "react-table";
import type { TableToolbarProps } from "../../../interfaces/interfaces";
import AddButton from "../buttons/AddButton";
import SearchInput from "../SearchInput";

export interface Command<T extends Record<string, unknown>> {
  label: string;
  onClick: TableMouseEventHandler<T>;
  icon?: JSX.Element;
  enabled: (instance: TableInstance<T>) => boolean;
}

export interface TableMouseEventHandler<T extends Record<string, unknown>> {
  (instance: TableInstance<T>): MouseEventHandler;
}

function Toolbar<T extends Record<string, unknown>>({
  onAdd,
  globalFilter,
  handleFilterInputChange,
}: PropsWithChildren<TableToolbarProps<T>>): ReactElement | null {
  // const { columns } = instance;
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  // const hideableColumns = columns.filter(
  //   (column) => !(column.id === "_selector")
  // );

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setColumnsOpen(true);
    },
    [setAnchorEl, setColumnsOpen]
  );

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setFilterOpen(true);
    },
    [setAnchorEl, setFilterOpen]
  );

  function handleClose() {
    setColumnsOpen(false);
    setFilterOpen(false);
    setAnchorEl(undefined);
  }

  // toolbar with add, edit, delete, filter/search column select.
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {onAdd && <AddButton className="text-lg" onClick={onAdd} />}
        <SearchInput
          placeholder="Search..."
          onSearch={() => handleFilterInputChange}
          value={globalFilter}
          className="rounded-md bg-secondary py-3 pr-5 pl-7 outline-none"
        />
      </div>
    </>
  );
}

export default Toolbar;
