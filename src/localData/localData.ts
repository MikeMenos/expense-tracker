import type { MenuItem } from "../interfaces/interfaces";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

export const icons = {
  MdDashboard,
  GrTransaction,
  FiSettings,
  MdCategory,
};

export const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    href: "/",
    icon: "MdDashboard",
  },
  {
    text: "Transactions",
    href: "/transactions",
    icon: "GrTransaction",
  },
  {
    text: "Expense Categories",
    href: "/categories",
    icon: "MdCategory",
  },
  {
    text: "Settings",
    href: "/settings",
    icon: "FiSettings",
  },
];
