import React, { useEffect } from "react";
import { Footer, Header } from "../../views";
import { observer } from "mobx-react";
import {
  authStore,
  EDeliveryStatus,
  EPaymenMethod,
  EPaymentStatus,
  orderDetailStore,
} from "../../stores";
import { Link, useNavigate, useParams } from "react-router-dom";

type Props = {};

export const OrderDetail: React.FC<Props> = observer(() => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Usage states
  const { isLogin } = authStore;
  const {
    orderDetail: order,
    getDetailOrder,
    isNotYetApprovedDeliveryStatus,
    cancelOrder,
  } = orderDetailStore;

  // Check auth when mount
  useEffect(() => {
    if (!isLogin || !orderId) {
      navigate("/");
    } else {
      getDetailOrder(parseInt(orderId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <main className="mb-8 flex justify-center items-center px-12 pb-16 pt-12">
        <div className="bg-white">
          <div className="mx-auto">
            <div className="flex flex-col flex-wrap gap-2">
              <h1 className="text-4xl font-semibold">
                Đơn hàng #{orderId} -{" "}
                {order?.deliveryStatus &&
                  EDeliveryStatus[
                    order.deliveryStatus as unknown as keyof typeof EDeliveryStatus
                  ]}
              </h1>
              <h6 className="text-lg">
                {new Date(order?.createdAt || "").toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </h6>
            </div>

            <hr className="my-4 border" />

            <h2 className="text-2xl font-semibold">Chi tiết</h2>
            <table className="w-full text-base text-left rtl:text-right text-gray-500 mt-4">
              <thead className="uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Tạm tính
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.cartItemDetails?.map((cart) => {
                  return (
                    <tr className="bg-white border-b" key={cart.sizeId}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <Link
                          to={`/product/${cart.productId}`}
                          className="text-cyan-400"
                        >
                          {cart.productName}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{cart.size}</td>
                      <td className="px-6 py-4">
                        {cart.productPrice?.toLocaleString()} đ
                      </td>
                      <td className="px-6 py-4">{cart.quantity}</td>
                      <td className="px-6 py-4 text-right">
                        {(
                          (cart.productPrice || 0) * (cart.quantity || 0)
                        ).toLocaleString()}{" "}
                        đ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end mt-4 text-lg font-semibold">
              Tổng cộng:{" "}
              <span className="text-red-500 ml-10 px-6 font-normal">
                {order?.totalAmount?.toLocaleString()} đ
              </span>
            </div>
            <hr className="mt-4" />
            <h2 className="text-2xl font-semibold mt-10">Thông tin</h2>
            <ul className="mt-4 text-lg">
              <li className="flex">
                <div className="w-48 font-semibold">Người nhận hàng:</div>
                <div>{order?.consignee}</div>
              </li>
              <li className="flex">
                <div className="w-48 font-semibold">Địa chỉ:</div>
                <div>{order?.deliveryAddress}</div>
              </li>
              <li className="flex">
                <div className="w-48 font-semibold">Hình thức thanh toán:</div>
                <div>
                  {
                    EPaymenMethod[
                      order?.paymentMethod as unknown as keyof typeof EPaymenMethod
                    ]
                  }
                </div>
              </li>
              <li className="flex flex-wrap gap-2">
                <div className="w-48 font-semibold">Trạng thái thanh toán:</div>
                <div>
                  {
                    EPaymentStatus[
                      order?.paymentStatus as unknown as keyof typeof EPaymentStatus
                    ]
                  }
                </div>
              </li>
            </ul>

            <button
              className="rounded-md uppercase py-2 px-6 mt-10 text-lg transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-cyan-400 text-white hover:bg-cyan-500"
              disabled={!isNotYetApprovedDeliveryStatus}
              onClick={() => cancelOrder()}
            >
              HỦY ĐƠN HÀNG
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
