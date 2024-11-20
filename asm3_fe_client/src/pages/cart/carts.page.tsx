import React from "react";
import { Footer, Header, ListCart } from "../../views";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { orderStore } from "../../stores";

type Props = {};

export const Carts: React.FC<Props> = observer(() => {
  const { totalPrice } = orderStore;
  return (
    <>
      <Header />

      <main className="mb-20 flex justify-center items-center px-20">
        <div className="bg-white py-24">
          <div className="mx-auto">
            <h1 className="text-4xl font-bold text-center uppercase">
              Giỏ Hàng
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
              <Link
                to={"/order"}
                className="py-2 px-8 text-xl bg-cyan-400 text-white rounded-md"
              >
                Đặt Hàng
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
