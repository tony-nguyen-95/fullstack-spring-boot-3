import { observer } from "mobx-react";
import React, { useMemo } from "react";

type Props = {
  store: any;
};

export const Pagination: React.FC<Props> = observer(({ store }) => {
  const {
    lengthOfItems,
    sizeOfPages,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = store;

  const total = lengthOfItems || 0;

  // Calculate the number of pages
  const numberOfPage = useMemo(() => {
    return Math.ceil(total / sizeOfPages);
  }, [total, sizeOfPages]);

  // Handle change in the number of items per page
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when the size changes
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= numberOfPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <nav className="flex flex-wrap justify-between items-end mb-4">
      {/* Page size selector */}
      <form className="max-w-sm">
        <label
          htmlFor="unitPerPage"
          className="block mb-1 text-[8px] font-medium text-gray-900"
        >
          Items per page
        </label>
        <select
          id="unitPerPage"
          defaultValue={sizeOfPages}
          onChange={handleChangeSize}
          className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </form>

      {/* Pagination controls */}
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <div
            onClick={() => handlePageChange(currentPage - 1)}
            className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Previous
          </div>
        </li>

        {Array.from({ length: numberOfPage }, (_, index) => (
          <li key={index}>
            <div
              onClick={() => handlePageChange(index + 1)}
              className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === index + 1 &&
                "text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {index + 1}
            </div>
          </li>
        ))}

        <li>
          <div
            onClick={() => handlePageChange(currentPage + 1)}
            className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  );
});
