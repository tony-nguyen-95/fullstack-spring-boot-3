import React, { useEffect } from "react";
import { Footer, Header } from "../../views";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  authStore,
  commentStore,
  orderStore,
  productDetailStore,
  wishlistStore,
} from "../../stores";
import { DOMAIN } from "../../apis";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Rate } from "../../component";

type Props = {};

export const ProductDetail: React.FC<Props> = observer(() => {
  const { productId } = useParams();

  const navigate = useNavigate();

  // Usage states
  const { productDetail, fetchProductDetail, setSelectedSize, selectedSize } =
    productDetailStore;
  const { addCart } = orderStore;
  const {
    createWishlist,
    listProductIdsWishlist,
    fetchWishlistByUserId,
    loadingWishlish,
  } = wishlistStore;
  const { isLogin, userLogined } = authStore;

  useEffect(() => {
    if (productId) {
      fetchProductDetail(parseInt(productId), navigate);

      commentStore.fetchCommentsByProductId(parseInt(productId));
      commentStore.setField("productId", productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (isLogin) {
      fetchWishlistByUserId(userLogined?.id || 0);
      commentStore.setField("userId", userLogined?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <main className="mb-8 flex justify-center gap-10 flex-wrap flex-col items-center px-20 py-20">
        <div className="flex w-full gap-14 mx-auto ">
          <div className="flex-1 overflow-hidden">
            <img
              src={`${DOMAIN}${productDetail?.imagePath}`}
              alt={productDetail?.name}
            />
          </div>
          <div className="flex-1">
            <small className="text-gray-400 text-base">
              ID: {productDetail?.id}
            </small>
            <h1 className="font-bold text-4xl mt-4">{productDetail?.name}</h1>
            <div className="text-cyan-400 font-semibold text-3xl mt-4">
              {productDetail?.price?.toLocaleString()} đ
            </div>
            <div id="size" className="mt-12">
              <h2 className="uppercase font-semibold text-xl">Size:</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {productDetail?.listSizeAvailable?.map((sizeAvailable) => (
                  <li key={sizeAvailable.sizeId}>
                    <button
                      className={`rounded-md w-10 py-1 ${
                        selectedSize?.sizeId === sizeAvailable.sizeId
                          ? "bg-cyan-300"
                          : "bg-gray-300"
                      } text-white text-lg disabled:bg-opacity-20 drop-shadow-md`}
                      onClick={() => setSelectedSize(sizeAvailable)}
                      disabled={sizeAvailable.quantity === 0}
                    >
                      {sizeAvailable.size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="uppercase text-xl font-semibold text-white bg-cyan-400 rounded-md py-4 px-8 drop-shadow-md mt-12 flex gap-6 items-center transition-transform hover:-translate-y-1"
              onClick={() =>
                addCart({
                  size: selectedSize?.size,
                  sizeId: selectedSize?.sizeId,
                  maxQuantity: selectedSize?.quantity,
                  productName: productDetail?.name,
                  productPrice: productDetail?.price,
                  productImagePath: productDetail?.imagePath,
                })
              }
            >
              <FaShoppingBag size={24} />
              chọn mua
            </button>
            <div className="mt-12">
              <button
                onClick={() => {
                  if (!isLogin) {
                    return navigate("/login");
                  }
                  return createWishlist(
                    userLogined?.id || 0,
                    productDetail?.id || 0
                  );
                }}
                className="flex gap-2 items-center"
                disabled={
                  listProductIdsWishlist.includes(productDetail?.id) ||
                  loadingWishlish
                }
              >
                {listProductIdsWishlist.includes(productDetail?.id) ? (
                  <IoIosHeart size={28} color="#22d3ee" />
                ) : (
                  <IoIosHeartEmpty size={28} color="#22d3ee" />
                )}
                <span className="text-cyan-400 text-2xl">Yêu thích</span>
              </button>
            </div>
            <hr className="my-8 border-2" />
            <div>
              <h2 className="text-2xl">Thông tin</h2>
              <ul className="mt-4 text-lg w-full">
                <li className="w-full flex">
                  <span className="text-gray-400 w-40">Thương hiệu:</span>{" "}
                  <span>{productDetail?.brand}</span>
                </li>
                <li className="w-full flex">
                  <span className="text-gray-400 w-40">Loại:</span>{" "}
                  <span>{productDetail?.category}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between self-start">
          {/* Comments */}
          <div className="w-5/12 my-4">
            <h3 className="text-2xl">Comments</h3>
            {commentStore.comments.length === 0 ? (
              <h4>Bài viết chưa có nhận xét nào!</h4>
            ) : (
              commentStore.comments.map((cm, index) => {
                return (
                  <Rate
                    author={`User ${cm.userId}`}
                    key={cm.id}
                    text={cm.text || ""}
                    rate={cm.rate || 0}
                  />
                );
              })
            )}
          </div>

          {/* Comment Form */}
          {authStore.isLogin ? (
            <div className="w-5/12 my-4 self-start">
              <h3 className="text-2xl">Leave a Comment</h3>
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  commentStore.addComment();
                }}
                className="mt-4"
              >
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium"
                  >
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    value={commentStore.comment.text || ""}
                    onChange={(e) =>
                      commentStore.setField("text", e.target.value)
                    }
                    className="h-12 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    rows={5}
                    placeholder="Write your comment here..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="rating" className="block text-sm font-medium">
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={commentStore.comment.rate || ""}
                    onChange={(e) =>
                      commentStore.setField("rate", Number(e.target.value))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                  >
                    {[...Array(5)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Star{i > 0 && "s"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          ) : (
            <div className="mb-56">
              <a
                href="/login"
                className="mt-8 mb-56 mx-8 w-full bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Login to comment
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
});
