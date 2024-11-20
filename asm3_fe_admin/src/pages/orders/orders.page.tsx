import React, { useEffect } from "react";
import { OrderFilter, Pagination, Sidebar } from "../../component";
import { observer } from "mobx-react";
import {
  authStore,
  EDeliveryStatus,
  EPaymentStatus,
  ordersStore,
} from "../../stores";
import { useNavigate } from "react-router-dom";

type Props = {};

export enum EPaymentStatusColor {
  CHO_THANH_TOAN_ATM = "#f97316", // Tailwind orange-500
  CHUA_THANH_TOAN = "#ef4444", // Tailwind red-500
  DA_THANH_TOAN = "#22c55e", // Tailwind green-500
  DA_HOAN_TIEN = "#3b82f6", // Tailwind blue-500
  DA_HUY_BO = "#6b7280", // Tailwind gray-500
}

export enum EDeliveryStatusColor {
  CHUA_XET_DUYET = "#f97316", // Tailwind orange-500
  CHO_GIAO_HANG = "#facc15", // Tailwind yellow-500
  DANG_GIAO_HANG = "#0ea5e9", // Tailwind sky-500
  DANG_GIAO_HANG_LAN_2 = "#3b82f6", // Tailwind blue-500
  GIAO_HANG_THANH_CONG = "#22c55e", // Tailwind green-500
  DA_HUY = "#ef4444", // Tailwind red-500
}

// Helper to render color statuses
export const updateOrderDeliveryStatusColor = (status: EDeliveryStatus) => {
  const color = Object.entries(EDeliveryStatusColor).find(
    ([key]) => key === status
  )?.[1];

  return color;
};

export const updateOrderPaymentStatusColor = (status: EPaymentStatus) => {
  const color = Object.entries(EPaymentStatusColor).find(
    ([key]) => key === status
  )?.[1];

  return color;
};

export const Orders: React.FC<Props> = observer(() => {
  const navigate = useNavigate();

  const { isLogin } = authStore;

  useEffect(() => {
    if (isLogin) {
      ordersStore.getOrders();
    } else {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <div className="sb-nav-fixed relative">
      <Sidebar />

      <div className="p-4 sm:ml-40">
        <OrderFilter />

        {!ordersStore.isOnFilter && <Pagination store={ordersStore} />}

        {ordersStore.isOnFilter && (
          <div className="text-lg text-center">Kết quả lọc:</div>
        )}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-gray-700 border-[1px]">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-100 dark:text-black border-gray-700">
              <tr>
                <th scope="col" className="px-6 py-2">
                  No
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Người nhận hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Phương thức thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái thanh toán
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái vận chuyển
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Ngày đặt
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersStore.displayOrder.map((order, index) => (
                <tr
                  key={index}
                  className="bg-neutral-400 text-black border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {order.consignee}
                  </th>
                  <td className="px-6 py-4">{order.paymentMethod}</td>

                  <td
                    className="px-6 py-4 text-bold"
                    style={{
                      color:
                        order.paymentStatus &&
                        updateOrderPaymentStatusColor(order.paymentStatus),
                    }}
                  >
                    {order.paymentStatus &&
                      EPaymentStatus[
                        order.paymentStatus as unknown as keyof typeof EPaymentStatusColor
                      ]}
                  </td>

                  <td
                    className="px-6 py-4 text-bold"
                    style={{
                      color:
                        order.deliveryStatus &&
                        updateOrderDeliveryStatusColor(order.deliveryStatus),
                    }}
                  >
                    {order.deliveryStatus &&
                      EDeliveryStatus[
                        order.deliveryStatus as unknown as keyof typeof EDeliveryStatus
                      ]}
                  </td>
                  <td className="px-6 py-4">{order.createdAt}</td>

                  <td className="px-6 py-4">{order.totalAmount}</td>

                  <td className="px-6 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          navigate(`/orders/${order.id || 0}`);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Detail
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
