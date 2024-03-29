import type { FC } from "react";
import {
  Sidebar as SidebarWrapper,
  Menu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";
import Button from "./buttons/Button";
import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetPageTitle } from "../../hooks/useGetPageTitle";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { RiExchangeBoxLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { type MenuItem as MenuItemInterface } from "../../interfaces/interfaces";

export const icons = {
  MdDashboard,
  RiExchangeBoxLine,
  FiSettings,
  MdCategory,
};

export const menuItems: MenuItemInterface[] = [
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

// @ts-ignore
const Sidebar: FC = ({
  collapseSidebarFunc,
  collapsed,
}: {
  collapseSidebarFunc: VoidFunction;
  collapsed: boolean;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { title } = useGetPageTitle(router.pathname);

  const getActive = (menuText: string) => {
    if (title === menuText) return true;
  };
  return (
    <div className="fixed flex min-h-[100vh]">
      <SidebarWrapper
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#192439",
          },
        }}
      >
        <div className="mt-12">
          <div className="flex min-h-[150px] flex-col items-center">
            <Image
              src={session?.user?.image ?? ""}
              alt="Profile Image"
              width={collapsed ? 40 : 80}
              height={collapsed ? 40 : 80}
              className="rounded-full"
            />
            {!collapsed && (
              <p className="mt-2 text-center">
                Welcome, <br />
                <span className="font-semibold">{session?.user?.name}</span>
              </p>
            )}
          </div>
          <Menu style={{ marginTop: "48px" }}>
            {menuItems.map((item) => {
              const Icon = icons[item.icon];
              return (
                <MenuItem
                  key={item.text}
                  icon={<Icon size="1.5em" />}
                  component={<Link href={item.href} />}
                  active={getActive(item.text)}
                >
                  {item.text}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
        <Menu
          style={{
            margin: "0 0 2rem 0",
          }}
        >
          <hr className="mx-3.5" />
          <MenuItem
            className="sign-out"
            icon={<BiLogOut size="1.5rem" />}
            onClick={() => signOut()}
          >
            <span>Sign Out</span>
          </MenuItem>
        </Menu>
      </SidebarWrapper>

      <div className="absolute -right-3 z-20 mt-4">
        <Button onClick={() => collapseSidebarFunc()}>
          {!collapsed ? (
            <FiArrowLeftCircle
              size="1.6em"
              fill="white"
              className="text-secondary"
            />
          ) : (
            <FiArrowRightCircle
              size="1.6em"
              fill="white"
              className="text-secondary"
            />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
