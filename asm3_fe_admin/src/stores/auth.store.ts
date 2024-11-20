import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ERoleUser } from "./orders.store";

export interface IUserLoginResponse {
  id?: number;
  name?: String;
  email?: String;
  phone?: String;
  role?: ERoleUser;
}

export interface ILogin {
  email: string;
  password: string;
}

class AuthStore {
  isLogin = false;
  userLogined: IUserLoginResponse | undefined = undefined;
  loginForm: ILogin = { email: "", password: "" };
  errorLogin: string = "";
  loadingAuth = false;

  constructor() {
    makeAutoObservable(this);
    this.checkLoginStatus();
  }

  setUserLogined = (userLogined: IUserLoginResponse) => {
    sessionStorage.setItem("user_logined", JSON.stringify(userLogined));
    this.userLogined = userLogined; // Assuming userLogined is defined in the store
    this.isLogin = true;
  };

  checkLoginStatus = () => {
    const storedUser = JSON.parse(
      sessionStorage.getItem("user_logined") || "null"
    );
    if (storedUser) {
      this.isLogin = true;
      this.setUserLogined(storedUser);
    } else {
      this.isLogin = false;
      this.userLogined = undefined;
    }
  };

  handleLogin = async () => {
    this.loadingAuth = true;
    try {
      const { data } = await API.post<IUserLoginResponse>(
        APIRoutes.LOGIN,
        this.loginForm
      );

      if (data) {
        this.setUserLogined(data);
        this.errorLogin = "";
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Login successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }
    } catch (error) {
      this.errorLogin = "Invalid username or password.";
    } finally {
      this.loadingAuth = false;
    }
  };

  logout = () => {
    sessionStorage.removeItem("user_logined");
    this.isLogin = false;
    this.userLogined = undefined;
  };
}

export const authStore = new AuthStore();
