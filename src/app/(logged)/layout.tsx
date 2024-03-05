"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { verifyAuthFE } from "@/utils/auth";

export default function LoggedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const isAuth = verifyAuthFE();

  // Validade auth in FE for Static Pages
  useEffect(() => {
    !isAuth && router.push("signin");
  }, [isAuth, router]);

  return !isAuth ? null : (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
