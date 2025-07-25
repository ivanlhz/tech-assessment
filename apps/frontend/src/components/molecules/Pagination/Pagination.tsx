import { PaginationProps } from "./Pagination.types";
import { ItemsPerPageWrapper, PageButton, PaginationControls, PaginationWrapper } from './Pagination.styled';
import React from "react";
import { Icon } from "../../atoms";
 
  export const Pagination = <T extends object>({
    table,
    totalItems
  }: PaginationProps<T>) => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxPagesToShow = 5;
      const ellipsis = <PageButton as="span">...</PageButton>;
  
      if (pageCount <= maxPagesToShow + 2) {
        for (let i = 1; i <= pageCount; i++) {
          pageNumbers.push(
            <PageButton
              key={i}
              isActive={i === currentPage}
              onClick={() => table.setPageIndex(i - 1)}
            >
              {i}
            </PageButton>
          );
        }
      } else {
        pageNumbers.push(
          <PageButton
            key={1}
            isActive={1 === currentPage}
            onClick={() => table.setPageIndex(0)}
          >
            1
          </PageButton>
        );
  
        if (currentPage > maxPagesToShow - 1) {
          pageNumbers.push(
            React.cloneElement(ellipsis, { key: 'ellipsis-start' })
          );
        }
  
        let startPage = Math.max(2, currentPage - 2);
        let endPage = Math.min(pageCount - 1, currentPage + 2);
  
        if (currentPage < maxPagesToShow - 1) {
          endPage = maxPagesToShow;
        }
        if (currentPage > pageCount - (maxPagesToShow - 1)) {
          startPage = pageCount - maxPagesToShow + 1;
        }
  
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <PageButton
              key={i}
              isActive={i === currentPage}
              onClick={() => table.setPageIndex(i - 1)}
            >
              {i}
            </PageButton>
          );
        }
  
        if (currentPage < pageCount - (maxPagesToShow - 2)) {
          pageNumbers.push(React.cloneElement(ellipsis, { key: 'ellipsis-end' }));
        }
  
        pageNumbers.push(
          <PageButton
            key={pageCount}
            isActive={pageCount === currentPage}
            onClick={() => table.setPageIndex(pageCount - 1)}
          >
            {pageCount}
          </PageButton>
        );
      }
  
      return pageNumbers;
    };
  
    return (
      <PaginationWrapper>
        <div>{totalItems} elementos</div>
        <PaginationControls>
          <PageButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon name="arrow-left" size={12} />
          </PageButton>
          {renderPageNumbers()}
          <PageButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon name="arrow-right" size={12} />
          </PageButton>
        </PaginationControls>
        <ItemsPerPageWrapper>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} / page
              </option>
            ))}
          </select>
        </ItemsPerPageWrapper>
      </PaginationWrapper>
    );
  };