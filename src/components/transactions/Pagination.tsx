"use client";

import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = (current: number) => {
    const delta = 2;
    let start = Math.max(current - delta, 1);
    let end = Math.min(current + delta, totalPages);

    if (current <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    } else if (current >= totalPages - 2) {
      start = Math.max(totalPages - 4, 1);
      end = totalPages;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const goToPage = (page: number) => setCurrentPage(page);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const visiblePages = getVisiblePages(currentPage);

  return (
    <div className="flex items-center justify-between w-full max-w-[1000px] mx-auto">
      <div className="flex justify-between w-full">
        <div
          onClick={goToPrev}
          className="cursor-pointer flex justify-center items-center h-[30px] md:h-[40px] w-[30px] md:w-[94px] md:px-4 md:py-2 md:gap-4 bg-white border border-[#98908B] rounded-lg"
        >
          <Image
            src="./images/transactions/left.svg"
            alt="left"
            width={16}
            height={16}
          />
          <p className="hidden md:block text-[14px] text-[#201F24]">prev</p>
        </div>

        <div className="flex gap-2">
          {visiblePages.map((page) => (
            <p
              key={page}
              onClick={() => goToPage(page)}
              className={`cursor-pointer flex justify-center items-center px-2 md:px-4 h-[30px] md:h-10 w-[30px] md:w-10 border border-[#98908B] rounded-lg ${
                currentPage === page
                  ? "bg-[#201F24] text-white"
                  : "bg-white text-black"
              }`}
            >
              {page}
            </p>
          ))}
        </div>

        <div
          onClick={goToNext}
          className="cursor-pointer flex justify-center items-center h-[30px] md:h-[40px] w-[30px] md:w-[94px] md:px-4 md:py-2 md:gap-4 bg-white border border-[#98908B] rounded-lg"
        >
          <p className="hidden md:block text-[14px] text-[#201F24]">next</p>
          <Image
            src="./images/transactions/right.svg"
            alt="right"
            width={16}
            height={16}
          />
        </div>
      </div>
    </div>
  );
}
