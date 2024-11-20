import React from "react";
import { observer } from "mobx-react";
import { orderStore } from "../../stores";
import { IoMdTrash } from "react-icons/io";
import { DOMAIN } from "../../apis";

type Props = {};

export const ListCart: React.FC<Props> = observer(() => {
  // Usage states
  const { cartItemsOrder, incQuantity, decQuantity, deleteCart } = orderStore;

  return (
    <div>
      {cartItemsOrder.map((cart) => (
        <div
          key={cart.sizeId}
          className="border-b h-36 flex items-center justify-between gap-10"
        >
          <div className="flex items-center gap-10">
            <img
              src={`${DOMAIN}${cart.productImagePath}`}
              alt=""
              className="aspect-square size-32"
            />
            <div>
              <div
                // to={`/product/${cart.P}`}
                className="text-cyan-400 font-semibold text-lg"
              >
                {cart.productName}
              </div>
              <div>Size: {cart.size}</div>
              {/* <div>{cart}</div> */}
            </div>
          </div>
          <div>{cart.productPrice?.toLocaleString()} đ</div>
          <div className="flex">
            <button
              onClick={() => decQuantity(cart.sizeId || 0)}
              className="py-3 px-4 bg-gray-300 disabled:opacity-30"
              // disabled={loading}
            >
              -
            </button>
            <div className="py-3 px-4 bg-gray-200">{cart.quantity}</div>
            <button
              onClick={() => incQuantity(cart.sizeId || 0)}
              className="py-3 px-4 bg-gray-300 disabled:opacity-30"
              // disabled={loading}
            >
              +
            </button>
          </div>
          <div>
            {((cart.quantity || 0) * (cart.productPrice || 0)).toLocaleString()}{" "}
            đ
          </div>
          <button
            className="px-8 disabled:opacity-30"
            onClick={() => deleteCart(cart.sizeId || 0)}
            // disabled={loading}
          >
            <IoMdTrash size={24} />
          </button>
        </div>
      ))}
    </div>
  );
});
