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
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";

export interface Command<T extends Record<string, unknown>> {
  label: string;
  onClick: TableMouseEventHandler<T>;
  icon?: JSX.Element;
  enabled: (instance: TableInstance<T>) => boolean;
  type?: "icon" | "button";
}

export interface TableMouseEventHandler<T extends Record<string, unknown>> {
  (instance: TableInstance<T>): MouseEventHandler;
}

function Toolbar<T extends Record<string, unknown>>({
  onAdd,
  onDelete,
  onEdit,
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
      <div className="flex items-center gap-4">
        {onAdd && <AddButton className="text-lg" onClick={onAdd} />}
        {onEdit && <EditButton />}
        {onDelete && <DeleteButton />}
        {/* {extraCommands.map((c) => {
          const { type = "icon" } = c;
          return type === "icon" ? (
            <SmallIconActionButton<T>
              key={`command-${c.label}`}
              instance={instance}
              icon={c.icon}
              onClick={c.onClick}
              label={c.label}
              enabled={c.enabled}
              variant="left"
            />
          ) : (
            <LabeledActionButton<T>
              key={`command-${c.label}`}
              instance={instance}
              icon={c.icon}
              onClick={c.onClick}
              label={c.label}
              enabled={c.enabled}
            />
          );
        })}
      </div>
      <div>
        <ColumnHidePage<T>
          instance={instance}
          onClose={handleClose}
          show={columnsOpen}
          anchorEl={anchorEl}
        />
        <FilterPage<T>
          instance={instance}
          onClose={handleClose}
          show={filterOpen}
          anchorEl={anchorEl}
        />
        {onRefresh && (
          <SmallIconActionButton<T>
            instance={instance}
            icon={<CachedIcon />}
            onClick={() => onRefresh}
            label="Refresh Table"
            variant="right"
          />
        )}
        {hideableColumns.length > 1 && (
          <SmallIconActionButton<T>
            instance={instance}
            icon={<ViewColumnsIcon />}
            onClick={() => handleColumnsClick}
            label="Show / hide columns"
            variant="right"
          />
        )}
        <SmallIconActionButton<T>
          instance={instance}
          icon={<FilterListIcon />}
          onClick={() => handleFilterClick}
          label="Filter by columns"
          variant="right"
        /> */}
      </div>
    </>
  );
}

export default Toolbar;
