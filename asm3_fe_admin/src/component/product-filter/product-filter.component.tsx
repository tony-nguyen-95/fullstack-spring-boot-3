import { observer } from "mobx-react";
import React, { useState } from "react";
import { IProduct, productStore } from "../../stores";

type Props = {};

export const ProductFilter: React.FC<Props> = observer(() => {
  const [filterKey, setFilterKey] = useState<keyof IProduct>("name");
  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilter = () => {
    // Off filter
    if (productStore.isOnFilter) {
      return productStore.setIsOnFilter();
    }

    // On filter
    productStore.setIsOnFilter();
    productStore.filterProductsByKey(filterKey, filterValue);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-10 items-center">
      <div className="mb-4">
        <label htmlFor="filterKey" className="block text-sm font-medium">
          Filter By
        </label>
        <select
          id="filterKey"
          value={filterKey}
          onChange={(e) => setFilterKey(e.target.value as keyof IProduct)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="name">Product's name</option>
          <option value="brand">Brand</option>
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="filterValue" className="block text-sm font-medium">
          Filter Value
        </label>
        <input
          id="filterValue"
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleFilter}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Apply/Close Filter
      </button>
    </div>
  );
});
