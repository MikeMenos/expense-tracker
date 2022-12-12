import {
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactElement,
  ReactNode,
} from "react";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

export type ChildrenType = {
  children: ReactElement | ReactElement[];
};

export interface InputInterface {
  required?: boolean;
  className?: string;
  label?: string;
  style?: CSSProperties;
  onChange?: (a: any) => void;
  onBlur?: (e: FocusEvent) => void;
  placeholder?: string;
  value: string | number;
  disabled?: boolean;
  name: string;
  id?: string;
  type: HTMLInputTypeAttribute;
  title?: string;
  hidden?: boolean;
  onKeyUp?: any;
  onKeyDown?: any;
  autoFocus?: boolean;
  defaultValue?: string | number;
  autoComplete?: string;
}

export interface ButtonInterface {
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  width?: string;
  enabled?: boolean;
  style?: CSSProperties;
  type?: "submit" | "button";
  show?: boolean;
  variant?: "red" | "green";
  onClick?: VoidFunction;
  icon?: JSX.Element;
  children?: ReactNode;
}

export const icons = {
  MdDashboard,
  GrTransaction,
  FiSettings,
};

export type MenuItem = {
  text: string;
  href: string;
  icon: keyof typeof icons;
};
