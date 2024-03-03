"use client";

import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLazySignOutQuery } from "@/store/api/auth";

export default function Navbar() {
  const router = useRouter();
  const [logout] = useLazySignOutQuery();
  const handleLogout = () => logout().then(() => router.push("signin"));

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b mb-4">
      <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
      </nav>
      <div className="space-x-4">
        <Button
          size="sm"
          variant="destructive"
          onClick={handleLogout}
          className="gap-1"
        >
          Logout
          <LogOutIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
