import type { icons } from "./../localData/localData";
import type {
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactElement,
  ReactNode,
  ChangeEvent,
  SetStateAction,
} from "react";
import type { Column, Row } from "react-table";

export type ChildrenType = {
  children: ReactElement | ReactElement[];
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
}

export interface ButtonInterface {
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  type?: "submit" | "button";
  show?: boolean;
  variant?: "red" | "green";
  onClick?: VoidFunction;
  icon?: JSX.Element;
  children?: ReactNode;
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
  onAdd?: () => void;
  onClick?: (row: Row<T>) => void;
  globalFilter?: string;
  handleFilterInputChange?: (arg0: string) => void;
}

export interface ArionDrawerInterface {
  children?: ReactNode;
  show: boolean;
  setShow?: SetStateAction<any>;
  width?: string;
  headerTitle?: string;
  id?: string;
  onClose?: VoidFunction;
  className?: string;
  style?: CSSProperties;
}
