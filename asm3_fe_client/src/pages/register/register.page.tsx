import React from "react";
import { observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
import { registerStore } from "../../stores";
import { Loading } from "../../component";
import { Footer, Header } from "../../views";

type Props = {};

export const Register: React.FC<Props> = observer(() => {
  // Usage states
  const { form, error, loadingRegister, setField, registerSubmit } =
    registerStore;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerSubmit(navigate);
  };

  return (
    <div className="relative">
      {loadingRegister && <Loading />}

      <Header />

      <div className="py-10">
        <div className="mx-auto">
          <div className="border rounded-md w-fit p-20 mx-auto shadow-lg">
            <h2 className="text-4xl font-semibold text-center">Đăng Ký</h2>
            <form action="" onSubmit={handleSubmit} className="mt-10">
              <fieldset>
                <div>
                  <label htmlFor="name" className="text-lg font-semibold">
                    Tên<span className="text-red-500"> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-200 p-2 rounded-md w-80"
                    placeholder="Nhập tên"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="text-lg font-semibold">
                    Email<span className="text-red-500"> *</span>
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-200 p-2 rounded-md w-80"
                    placeholder="Nhập email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="phoneNumber"
                    className="text-lg font-semibold"
                  >
                    Số điện thoại<span className="text-red-500"> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    inputMode="numeric"
                    name="phoneNumber"
                    id="phoneNumber"
                    pattern="(84|0)[35789][0-9]{8}"
                    className="bg-gray-200 p-2 rounded-md w-80"
                    placeholder="Nhập số điện thoại"
                    value={form.phoneNumber}
                    onChange={(e) => setField("phoneNumber", e.target.value)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="text-lg font-semibold">
                    Mật Khẩu<span className="text-red-500"> *</span>
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-200 p-2 rounded-md w-80"
                    placeholder="Nhập mật khẩu"
                    value={form.password}
                    onChange={(e) => setField("password", e.target.value)}
                    required
                  />
                </div>
              </fieldset>
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
              <button
                type="submit"
                className="p-2 bg-black text-white rounded-md mt-10 w-full font-semibold disabled:opacity-30"
                disabled={loadingRegister}
              >
                Đăng Ký
              </button>
            </form>
            <div className="text-center mt-10 text-lg">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-sky-400">
                Đăng Nhập
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});
