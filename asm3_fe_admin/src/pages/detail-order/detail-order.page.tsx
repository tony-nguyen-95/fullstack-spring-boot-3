import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../component";
import { observer } from "mobx-react";
import {
  EDeliveryStatus,
  EPaymentStatus,
  orderDetailStore,
} from "../../stores";
import {
  updateOrderDeliveryStatusColor,
  updateOrderPaymentStatusColor,
} from "../orders";

type Props = {};

export const DetailOrder: React.FC<Props> = observer((props: Props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { orderDetail } = orderDetailStore;

  useEffect(() => {
    if (id) {
      orderDetailStore.getDetailOrder(parseInt(id));
    }
  }, [id]);

  return (
    <div className="sb-nav-fixed relative">
      <Sidebar />

      <div className="p-4 sm:ml-40 pt-8 px-8">
        {/* Title */}
        <div className="flex justify-between border-gray border-b-[1px] pb-4 items-center">
          <h2 className="text-cyan-500">Chi tiết đơn hàng #{id}</h2>
          <button
            onClick={() => {
              orderDetailStore.deleteOrder();
              navigate("/orders");
            }}
            className="rounded bg-red-500 flex justify-center text-white py-2 px-4 "
          >
            Huỷ đơn hàng
          </button>
        </div>

        {/* General Info */}
        <div className="w-full pb-4 pt-2 border-b-[1px] border-gray">
          <div className="space-y-4 flex flex-wrap justify-between">
            <h5 className="w-[48%] flex items-center space-x-2">
              <span className="text-gray-600">Người nhận hàng:</span>
              <span className="text-blue-600">{orderDetail?.consignee}</span>
            </h5>

            <h5 className="w-[48%] flex items-center space-x-2">
              <span className="text-gray-600">SDT nhận hàng:</span>
              <span className="text-blue-600">
                {orderDetail?.consigneePhone}
              </span>
            </h5>

            <h5 className="w-[48%] flex items-center space-x-2">
              <span className="text-gray-600">Địa chỉ nhận hàng:</span>
              <span className="text-blue-600">
                {orderDetail?.deliveryAddress}
              </span>
            </h5>
            <h5 className="w-[48%] flex items-center space-x-2">
              <span className="text-gray-600">Hình thức thanh toán:</span>
              <span className="text-blue-600">
                {orderDetail?.paymentMethod}
              </span>
            </h5>

            <h5 className="w-[48%] flex items-center space-x-2">
              <span className="text-gray-600">Trạng thái thanh toán:</span>
              <span
                style={{
                  color: updateOrderPaymentStatusColor(
                    orderDetail?.paymentStatus || EPaymentStatus.DA_HUY_BO
                  ),
                }}
              >
                {
                  EPaymentStatus[
                    orderDetail?.paymentStatus as unknown as keyof typeof EPaymentStatus
                  ]
                }
              </span>
            </h5>

            <h5 className="w-[48%] flex items-center space-x-2">
              <span className="text-gray-600">Trạng thái vận chuyển:</span>
              <span
                style={{
                  color: updateOrderDeliveryStatusColor(
                    orderDetail?.deliveryStatus || EDeliveryStatus.DA_HUY
                  ),
                }}
              >
                {
                  EDeliveryStatus[
                    orderDetail?.deliveryStatus as unknown as keyof typeof EDeliveryStatus
                  ]
                }
              </span>
            </h5>
          </div>
        </div>

        {/* General action */}
        <div className="flex flex-col py-4 border-b-[1px] border-gray">
          <h3 className="text-gray-500 pb-3">
            Click để thay đổi trạng thái giao hàng của đơn hàng
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(EDeliveryStatus).map(([key, status]) => (
              <button
                key={status}
                onClick={() =>
                  orderDetailStore.updateDeliveryStatusOrder(
                    key as EDeliveryStatus
                  )
                }
                className="px-4 py-2 font-medium rounded-lg shadow-md text-slate-200"
                style={{
                  backgroundColor: updateOrderDeliveryStatusColor(
                    key as EDeliveryStatus
                  ),
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col py-4 border-b-[1px] border-gray">
          <h3 className="text-gray-500 pb-3">
            Click để thay đổi trạng thái thanh toán của đơn hàng
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(EPaymentStatus).map(([key, status]) => (
              <button
                key={status}
                onClick={() =>
                  orderDetailStore.updatePaymentStatusOrder(
                    key as EPaymentStatus
                  )
                }
                className="px-4 py-2 font-medium rounded-lg shadow-md text-slate-200"
                style={{
                  backgroundColor: updateOrderPaymentStatusColor(
                    key as EPaymentStatus
                  ),
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* CartItem list */}
        <div className="flex flex-col pt-4 border-b-[1px] border-gray pb-20">
          <h3 className="text-gray-500 pb-3">Chi tiết các items</h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đơn giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tạm tính
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetail?.cartItemDetails &&
                  orderDetail?.cartItemDetails.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.productName}</td>
                      <td className="px-6 py-4">{item.size}</td>
                      <td className="px-6 py-4">{item.productPrice}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">
                        {item.productPrice && item.quantity
                          ? item.productPrice * (item.quantity || 0)
                          : 0}
                      </td>
                    </tr>
                  ))}
                <tr className="bg-white dark:bg-slate-100 text-black">
                  <td className="px-6 py-4 text-right" colSpan={5}>
                    Tổng tiền:
                  </td>
                  <td className="px-6 py-4" colSpan={5}>
                    {orderDetail?.cartItemDetails?.reduce(
                      (acc, item) =>
                        (item.quantity || 0) * (item.productPrice || 0),
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
