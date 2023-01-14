import { useEffect, useState } from "react";

export const useGetPageTitle = (pathname: string) => {
  const [title, setTitle] = useState("/");

  useEffect(() => {
    if (pathname === "/") setTitle("Dashboard");
    if (pathname === "/transactions") setTitle("Transactions");
    if (pathname === "/settings") setTitle("Settings");
    if (pathname === "/categories") setTitle("Categories");
    if (pathname === "/signin") setTitle("Sign In");
    if (pathname === "/forgot-password") setTitle("Forgot Password");
    if (pathname === "/signup") setTitle("Register");
  }, [pathname]);

  return { title };
};
