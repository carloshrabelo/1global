import React, { useMemo } from "react";

import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

export const PAGE_DISTANCE = 2;

interface PageNumbersProps {
  current: number;
  pages: number;
  onClick: (current: number) => void;
}

const PageNumbers = ({ current, pages, onClick }: PageNumbersProps) => {
  const currentNumbers = useMemo(() => {
    const startPage = Math.max(1, current - PAGE_DISTANCE);
    const endPage = Math.min(pages, current + PAGE_DISTANCE);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => index + startPage,
    );
  }, [current, pages]);

  return (
    <>
      {currentNumbers.map((number) => {
        const isActive = current === number;

        return (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => !isActive && onClick(number)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`go to page ${number}`}
              isActive={isActive}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </>
  );
};

export default PageNumbers;
