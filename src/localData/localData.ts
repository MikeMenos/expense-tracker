import type { MenuItem } from "../interfaces/interfaces";
import { MdDashboard } from "react-icons/md";
import { RiExchangeBoxLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

export const icons = {
  MdDashboard,
  RiExchangeBoxLine,
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
    icon: "RiExchangeBoxLine",
  },
  {
    text: "Categories",
    href: "/categories",
    icon: "MdCategory",
  },
  {
    text: "Settings",
    href: "/settings",
    icon: "FiSettings",
  },
];
