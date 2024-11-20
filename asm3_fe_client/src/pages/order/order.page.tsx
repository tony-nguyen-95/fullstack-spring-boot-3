import React, { FormEvent, useEffect } from "react";
import { Footer, Header, ListCart } from "../../views";
import { observer } from "mobx-react";
import { authStore, EPaymenMethod, orderStore } from "../../stores";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Order: React.FC<Props> = observer(() => {
  const navigate = useNavigate();

  // Usage states
  const { totalPrice, setField, cartLength } = orderStore;
  const { isLogin } = authStore;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    orderStore.submitOrder();
  };

  useEffect(() => {
    // Prevent order if use not login or not having any items in cart
    if (!isLogin || !cartLength) {
      navigate("/login");
    }
  }, [cartLength, isLogin, navigate]);

  useEffect(() => {
    // Scroll to the top of the window when the page mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="mb-20 flex justify-center flex-col items-center px-8">
        <div className="bg-white py-24">
          <div className="container">
            <h1 className="text-4xl font-bold text-center uppercase">
              Thanh Toán
            </h1>
            <form
              className="flex flex-col xl:flex-row gap-10 mt-20"
              onSubmit={handleSubmit}
            >
              <fieldset className="border p-10 rounded-md drop-shadow-md flex-1">
                <h2 className="text-2xl font-semibold">Thông tin giao hàng</h2>
                <div className="flex flex-col mt-4">
                  <label htmlFor="recipient">Người nhận *</label>
                  <input
                    type="text"
                    id="consignee"
                    name="consignee"
                    value={orderStore.orderForm.consignee}
                    onChange={(e) => setField("consignee", e.target.value)}
                    className="bg-gray-200 p-2 rounded-md min-w-80"
                    required
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="phoneNumber">Điện thoại *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="consigneePhone"
                    id="consigneePhone"
                    value={orderStore.orderForm.consigneePhone}
                    onChange={(e) => setField("consigneePhone", e.target.value)}
                    pattern="(84|0)[35789][0-9]{8}"
                    className="bg-gray-200 p-2 rounded-md min-w-80"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="address">Địa chỉ *</label>
                  <textarea
                    rows={3}
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={orderStore.orderForm.deliveryAddress}
                    onChange={(e) =>
                      setField("deliveryAddress", e.target.value)
                    }
                    className="bg-gray-200 p-2 rounded-md min-w-80"
                    required
                  />
                </div>
              </fieldset>

              <fieldset className="border p-10 rounded-md drop-shadow-md h-min flex-1">
                <h2 className="text-2xl font-semibold">
                  Phương thức thanh toán
                </h2>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="radio"
                    name="payment-method"
                    id="payment-method-atm"
                    value="ATM"
                    checked={
                      orderStore.orderForm.paymentMethod === EPaymenMethod.ATM
                    }
                    onChange={(e) => setField("paymentMethod", e.target.value)}
                    required
                  />
                  <label htmlFor="payment-method-atm">Thanh toán qua ATM</label>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="radio"
                    name="payment-method"
                    id="payment-method-cod"
                    value="COD"
                    checked={
                      orderStore.orderForm.paymentMethod === EPaymenMethod.COD
                    }
                    onChange={(e) => setField("paymentMethod", e.target.value)}
                    required
                  />
                  <label htmlFor="payment-method-cod">
                    Thanh toán khi nhận hàng
                  </label>
                </div>

                <div className="flex justify-between items-end mt-12">
                  <h2 className="text-2xl font-semibold">Thành tiền</h2>
                  <div className="text-xl text-cyan-400">
                    {totalPrice.toLocaleString()} đ
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-cyan-400 rounded-md mt-4 text-white text-xl font-semibold"
                >
                  Đặt mua
                </button>
              </fieldset>
            </form>
          </div>
        </div>

        <div className="mx-auto">
          <h1 className="text-4xl font-bold text-center uppercase">
            Xem lại giỏ Hàng
          </h1>
          <hr className="mt-8" />
          <ListCart />
          <div className="flex mt-10 gap-4 items-center justify-end">
            <div className="text-lg">
              Tổng:{" "}
              <span className="text-cyan-400">
                {totalPrice.toLocaleString()} đ
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
