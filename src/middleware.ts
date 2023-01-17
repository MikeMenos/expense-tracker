import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("user-token")?.value;

  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (!req.nextUrl.pathname.startsWith("/signin") && !verifiedToken) return;

  const url = req.url;

  if (url.includes("/signin") && verifiedToken) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/signin", url));
  }
};

export const config = () => {
  matcher: ["/", "categories", "/transactions", "settings", "/signin"];
};
