"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const List = ({ className, children, ...props }: Props) => {
  return (
    <ul className={className} {...props}>
      {children}
    </ul>
  );
};

export default List;
