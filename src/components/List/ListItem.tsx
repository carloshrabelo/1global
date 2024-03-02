"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

const ListItem = ({ className, children, ...props }: Props) => {
  return (
    <li
      className={cn(
        `
      flex
      flex-col
      rounded-t-md
      p-3
      leading-none
      transition-colors
      border-b
      border-b-muted
      hover:bg-accent
      focus:bg-accent
      `,
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export default ListItem;
