import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../stores";
import { Loading } from "../../component/loading";
import { Footer, Header } from "../../views";

type Props = {};

export const Login: React.FC<Props> = observer(() => {
  // Usage states
  const { loginForm, errorLogin, handleLogin, isLogin } = authStore;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    // Scroll to the top of the window when the page mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {authStore.loadingAuth && <Loading />}

      <Header />
      <div className="my-10">
        <div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email"
                  value={loginForm.email}
                  onChange={(e) => (loginForm.email = e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={loginForm.password}
                  onChange={(e) => (loginForm.password = e.target.value)} // Update store's login form
                  required
                />
              </div>
              {errorLogin !== "" && (
                <p className="text-red-500">{errorLogin}</p>
              )}
              <button
                type="submit"
                className="w-full bg-white hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});
