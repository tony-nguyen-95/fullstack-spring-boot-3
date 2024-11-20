import { observer } from "mobx-react";
import React, { useState } from "react";
import { IOrder, ordersStore } from "../../stores";

type Props = {};

export const OrderFilter: React.FC<Props> = observer(() => {
  const [filterKey, setFilterKey] = useState<keyof IOrder>("paymentStatus");
  const [filterValue, setFilterValue] = useState<string>("");

  const handleFilter = () => {
    // Off filter
    if (ordersStore.isOnFilter) {
      return ordersStore.setIsOnFilter();
    }

    // On filter
    ordersStore.setIsOnFilter();
    ordersStore.filterProductsByKey(filterKey, filterValue);
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
          onChange={(e) => setFilterKey(e.target.value as keyof IOrder)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="paymentStatus">Payment Status</option>
          <option value="consignee">Consignee</option>
          <option value="deliveryAddress">Delivery Address</option>
          <option value="deliveryStatus">Delivery Status</option>
          <option value="createdAt">Order Date</option>
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
