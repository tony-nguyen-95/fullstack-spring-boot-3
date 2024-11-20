import React, { useEffect } from "react";
import { Footer, Header } from "../../views";
import { observer } from "mobx-react";
import {
  authStore,
  EDeliveryStatus,
  EPaymentStatus,
  profileWithOrdersStore,
} from "../../stores";
import { Link, useNavigate } from "react-router-dom";

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

type Props = {};

export const ProfileWithOrders: React.FC<Props> = observer(() => {
  const navigate = useNavigate();

  // Usage states
  const { isLogin, userLogined } = authStore;

  const { profileWithOrder, fetchProfileWithOrder } = profileWithOrdersStore;

  // Check auth when mount
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    } else {
      fetchProfileWithOrder(userLogined?.id || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <main className="mb-8 flex justify-center items-center px-20 pb-16 pt-12">
        <div>
          <h1 className="text-4xl font-semibold text-center">
            Tài khoản của tôi
          </h1>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Quản lý đơn hàng</h2>
            <table className="w-full text-base text-left rtl:text-right text-gray-500 mt-4">
              <thead className="uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Mẫ đơn hàng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày mua
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái thanh toán
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái vận chuyển
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {profileWithOrder?.orders?.map((order) => {
                  return (
                    <tr
                      className="bg-white border-b cursor-pointer"
                      key={order.id}
                      onClick={() =>
                        navigate(`/profile-with-orders/${order.id}`)
                      }
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-cyan-400 cursor-pointer">
                          #{order.id}
                        </span>
                      </th>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt || "").toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}
                      </td>
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
                            updateOrderDeliveryStatusColor(
                              order.deliveryStatus
                            ),
                        }}
                      >
                        {order.deliveryStatus &&
                          EDeliveryStatus[
                            order.deliveryStatus as unknown as keyof typeof EDeliveryStatus
                          ]}
                      </td>
                      <td className="px-6 py-4">
                        {order.totalAmount?.toLocaleString()} đ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Thông tin tài khoản</h2>
            <ul className="mt-4 text-lg">
              <li className="flex">
                <div className="w-48 font-semibold">User' ID:</div>
                <div>{profileWithOrder?.userId}</div>
              </li>
              <li className="flex">
                <div className="w-48 font-semibold">Họ tên:</div>
                <div>{profileWithOrder?.name}</div>
              </li>
              <li className="flex">
                <div className="w-48 font-semibold">Email:</div>
                <div>{profileWithOrder?.email}</div>
              </li>
              <li className="flex">
                <div className="w-48 font-semibold">Số điện thoại:</div>
                <div>{profileWithOrder?.phone || "Chưa cập nhập"}</div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
