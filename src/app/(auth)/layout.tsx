import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="grid content-evenly justify-center h-screen bg-slate-400">
      {children}
    </div>
  );
}
