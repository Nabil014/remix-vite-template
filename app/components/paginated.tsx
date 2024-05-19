import React, { useMemo, useCallback } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getPages = useCallback(() => {
    const pages = [];
    const maxPagesToShow = 3;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPages = [1];
      const endPages = [totalPages];

      let start = Math.max(2, currentPage - halfMaxPagesToShow);
      let end = Math.min(totalPages - 1, currentPage + halfMaxPagesToShow);

      if (currentPage - halfMaxPagesToShow <= 1) {
        start = 2;
        end = start + maxPagesToShow - 3;
      }

      if (currentPage + halfMaxPagesToShow >= totalPages) {
        end = totalPages - 1;
        start = end - maxPagesToShow + 3;
      }

      pages.push(...startPages);
      if (start > 2) {
        pages.push('...');
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(...endPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const pages = useMemo(() => getPages(), [getPages]);

  return (
    <nav className="flex items-center gap-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-[#6EEAEA] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <svg
          className="flex-shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span aria-hidden="true" className="sr-only">
          Previous
        </span>
      </button>
      {pages.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
          disabled={pageNumber === '...'}
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-[#6EEAEA] py-2 px-3 text-sm rounded-lg focus:outline-none ${
            currentPage === pageNumber
              ? "bg-gray-100"
              : "hover:bg-gray-100 dark:border-neutral-700 dark:text-white dark:focus:bg-white/10"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-[#6EEAEA] hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
      >
        <span aria-hidden="true" className="sr-only">
          Next
        </span>
        <svg
          className="flex-shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};

export default React.memo(Pagination);