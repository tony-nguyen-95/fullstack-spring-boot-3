import React from "react";
import { Link } from "react-router-dom";
import { IoIosCart, IoIosSearch } from "react-icons/io";
import logo from "../../assets/logo-1.png";
import { observer } from "mobx-react";
import { authStore, orderStore, productStore } from "../../stores";

export const Header: React.FC = observer(() => {
  // Usage state
  const { logout, isLogin } = authStore;

  return (
    <header className="sticky top-0 z-20 shadow">
      <div className="bg-black text-zinc-400sticky top-0">
        <div className="mx-auto flex h-10 items-center justify-end px-4 text-sm">
          <nav>
            <ul className="flex gap-4 uppercase text-white">
              {isLogin && (
                <li>
                  <Link
                    to={"/wishlist"}
                    className="hover:text-zinc-200 transition-colors"
                  >
                    Yêu thích
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={"/carts"}
                  className="hover:text-zinc-200 transition-colors"
                >
                  Giỏ Hàng
                </Link>
              </li>

              {/* Not auth */}
              {!isLogin && (
                <>
                  <li>
                    <Link
                      to={"/register"}
                      className="hover:text-zinc-200 transition-colors"
                    >
                      Đăng Ký
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/login"}
                      className="hover:text-zinc-200 transition-colors"
                    >
                      Đăng Nhập
                    </Link>
                  </li>
                </>
              )}

              {/* Auth */}
              <li>
                <Link
                  to={"/profile-with-orders"}
                  className="hover:text-zinc-200 transition-colors"
                >
                  Tài Khoản
                </Link>
              </li>

              <li>
                <button
                  className="hover:text-zinc-200 transition-colors"
                  onClick={logout}
                >
                  ĐĂNG XUẤT
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="bg-white text-black">
        <div className="mx-auto h-20 flex items-center justify-between px-16">
          <div className="flex flex-wrap gap-12 justify-start items-center">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>

            <form className="flex items-center justify-center border-b mr-auto">
              <input
                name="q"
                className="mr-2 font-semibold focus:outline-none w-80 py-2"
                placeholder="Tìm Kiếm"
                onChange={(e: any) =>
                  productStore.setSearchByProductName(
                    e.target.value.toLowerCase()
                  )
                }
              />
              <button>
                <IoIosSearch size={24} />
              </button>
            </form>
          </div>
          <div className="flex flex-wrap gap-4 justify-end items-center">
            <Link
              to={"/product"}
              className="text-lg hover:opacity-80 transition-opacity underline"
            >
              Sản Phẩm
            </Link>
            <Link
              to={"/carts"}
              className="relative size-10 flex justify-center items-center"
            >
              {orderStore.cartLength !== 0 && (
                <span className="absolute top-0 right-0 flex justify-center items-center size-4 bg-red-500 rounded-full text-white">
                  {orderStore.cartLength}
                </span>
              )}
              <IoIosCart size={28} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});
