import React from "react";

import {
  Pagination as PaginationDOM,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PageNumbers from "./PageNumbers";

export interface PaginationProps {
  current: number;
  pages: number;
  onClick: (current: number) => void;
}

const Pagination = ({ current, pages, onClick }: PaginationProps) => {
  const isFirstPage = current === 1;
  const isLastPage = current === pages;

  const prevPage = () => !isFirstPage && onClick(current - 1);
  const nextPage = () => !isLastPage && onClick(current + 1);

  return (
    <PaginationDOM>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={prevPage}
            aria-label="Previous page"
            disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            aria-disabled={isFirstPage}
          />
        </PaginationItem>
        <PageNumbers current={current} pages={pages} onClick={onClick} />
        <PaginationItem>
          <PaginationNext
            onClick={nextPage}
            disabled={isLastPage}
            aria-label="Next page"
            aria-disabled={isLastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationDOM>
  );
};

export default Pagination;
