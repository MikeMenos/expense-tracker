import type {
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactNode,
  ChangeEvent,
  SetStateAction,
  SyntheticEvent,
} from "react";
import type { Column, Row } from "react-table";
import { icons } from "../components/shared/Sidebar";

export type ChildrenType = {
  children?: ReactNode;
};

export interface InputInterface {
  required?: boolean;
  className?: string;
  label?: string;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent) => void;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  name?: string;
  type?: HTMLInputTypeAttribute;
  title?: string;
  hidden?: boolean;
  onKeyUp?: KeyboardEvent;
  onKeyDown?: KeyboardEvent;
  defaultValue?: string | number;
  icon?: JSX.Element;
  closeIcon?: JSX.Element;
  onClear?: VoidFunction;
}

export interface ButtonInterface extends ChildrenType {
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  type?: "submit" | "button";
  show?: boolean;
  variant?: "red" | "green";
  onClick?: VoidFunction | ((e: SyntheticEvent) => Promise<void>);
  icon?: JSX.Element;
  onlyIcon?: boolean;
  onlyText?: boolean;
}

export type MenuItem = {
  text: string;
  href: string;
  icon: keyof typeof icons;
};

export interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  name: string;
  onAdd?: () => void;
  onClick?: (row: Row<T>) => void;
  style?: CSSProperties;
}

export interface TableToolbarProps<T extends Record<string, unknown>> {
  onAdd?: VoidFunction;
  onClick?: (row: Row<T>) => void;
  handleFilterInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  setGlobalFilter?: any;
  filterValue?: string;
  setFilterValue?: any;
}

export interface ArionDrawerInterface extends ChildrenType {
  show: boolean;
  setShow?: SetStateAction<any>;
  width?: string;
  headerTitle?: string;
  id?: string;
  onClose?: VoidFunction;
  className?: string;
  style?: CSSProperties;
}

export interface SelectorPropsInterface {
  value: {
    label: string;
    value: string;
  };
  name: string;
  onChange: any;
  placeholder?: string;
  required?: boolean;
}
