import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function LoggedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
