import type { icons } from "./../localData/localData";
import type {
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactElement,
  ReactNode,
  SyntheticEvent,
} from "react";

export type ChildrenType = {
  children: ReactElement | ReactElement[];
};

export interface InputInterface {
  required?: boolean;
  className?: string;
  label?: string;
  style?: CSSProperties;
  onChange?: (a: SyntheticEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  placeholder?: string;
  value: string | number;
  disabled?: boolean;
  name: string;
  id?: string;
  type: HTMLInputTypeAttribute;
  title?: string;
  hidden?: boolean;
  onKeyUp?: KeyboardEvent;
  onKeyDown?: KeyboardEvent;
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

export type MenuItem = {
  text: string;
  href: string;
  icon: keyof typeof icons;
};
