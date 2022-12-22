import type { FC } from "react";
import {
  Sidebar as SidebarWrapper,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { icons, menuItems } from "../../localData/localData";
import Link from "next/link";

const Sidebar: FC = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { data: session } = useSession();

  return (
    <div className="relative flex h-[100vh]">
      <SidebarWrapper
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        width="250px"
      >
        <div className="mt-12">
          <div className="flex flex-col items-center">
            <img
              src={session?.user?.image ?? ""}
              alt="Profile Image"
              width={collapsed ? 40 : 80}
              height={collapsed ? 40 : 80}
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
                  icon={<Icon size="1.2em" />}
                  routerLink={<Link href={item.href} />}
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
          <MenuItem icon={<BiLogOut size="1.5rem" />} onClick={() => signOut()}>
            <span className="font-semibold">Sign Out</span>
          </MenuItem>
        </Menu>
      </SidebarWrapper>

      <div className="absolute right-0 z-20">
        <Button onClick={() => collapseSidebar()}>
          {!collapsed ? (
            <TbLayoutSidebarLeftCollapse size="1.6em" />
          ) : (
            <TbLayoutSidebarRightCollapse size="1.6em" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
