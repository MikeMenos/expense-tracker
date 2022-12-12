import type { MenuItem } from "../interfaces/interfaces";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

export const icons = {
  MdDashboard,
  GrTransaction,
  FiSettings,
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
    text: "Settings",
    href: "/settings",
    icon: "FiSettings",
  },
];
