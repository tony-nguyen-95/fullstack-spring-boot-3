import React, { useEffect } from "react";
import { Footer, Header } from "../../views";
import { observer } from "mobx-react";
import { authStore, wishlistStore } from "../../stores";
import { Link, useNavigate } from "react-router-dom";
import { DOMAIN } from "../../apis";
import { IoMdTrash } from "react-icons/io";

type Props = {};

export const Wishlist: React.FC<Props> = observer(() => {
  const navigate = useNavigate();

  // Usage states
  const { isLogin, userLogined } = authStore;
  const { userWishlistMap, fetchWishlistByUserId, deleteWishlist } =
    wishlistStore;

  useEffect(() => {
    // Prevent order if use not login or not go from home
    if (!isLogin) {
      navigate("/");
    } else {
      fetchWishlistByUserId(userLogined?.id || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <h1 className="text-4xl font-semibold text-center uppercase">
              Danh sách yêu thích
            </h1>
            <div className="mt-20">
              {userWishlistMap &&
                Array.from(userWishlistMap.entries()).map(
                  ([wishItem, product]) => (
                    <div
                      key={wishItem.id}
                      className="flex justify-between border-b py-4"
                    >
                      <div className="flex items-start gap-10">
                        <img
                          src={`${DOMAIN}${product.imagePath}`}
                          alt={product.name}
                          className="size-28"
                        />
                        <div className="text-lg pt-4">
                          <Link
                            to={`/product/${product.id}`}
                            className="text-cyan-400 font-semibold"
                          >
                            {product.name}
                          </Link>
                          <div className="text-red-500">
                            {product.price?.toLocaleString()} đ
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-cyan-500 flex items-center gap-2 disabled:opacity-30"
                        onClick={() =>
                          deleteWishlist(
                            wishItem?.id || 0,
                            userLogined?.id || 0
                          )
                        }
                      >
                        <IoMdTrash />
                        <span>Xóa khỏi danh sách</span>
                      </button>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
