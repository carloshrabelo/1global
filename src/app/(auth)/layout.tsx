import ToggleThemeButton from "@/components/ToggleThemeButton";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="grid content-evenly justify-center h-screen bg-slate-400 dark:bg-slate-900">
      <ToggleThemeButton className="absolute top-4 right-4" size="sm" />
      {children}
    </div>
  );
}
