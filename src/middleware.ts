import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./utils/auth";

const authPath = "signin";
const publicPath = [authPath, "signup"];

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|img|logo|boot|manifest.webmanifest|sw.js|favicon.ico|api/auth).*)",
  ],
};

export const middleware = async (req: NextRequest) => {
  if (publicPath.some((path) => req.nextUrl.pathname.startsWith(`/${path}`))) {
    return NextResponse.next();
  }

  const verifiedToken = verifyAuth(req);

  if (!verifiedToken) {
    return NextResponse.redirect(new URL(`/${authPath}`, req.url));
  }
  return NextResponse.next();
};
