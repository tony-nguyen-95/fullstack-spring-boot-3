import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export interface IRegisterForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

class RegisterStore {
  form: IRegisterForm = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  loadingRegister: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.registerSubmit = this.registerSubmit.bind(this);
  }

  setField = (field: keyof IRegisterForm, value: string) => {
    this.form[field] = value;
  };

  registerSubmit = async (navigate: (path: string) => void) => {
    this.loadingRegister = true;
    this.error = null;

    try {
      const { data } = await API.post(APIRoutes.REGISTER, { ...this.form });

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Register successfully!</p>",
          timer: 800,
          icon: "success",
        });

        // Reset form
        this.form = { name: "", email: "", phoneNumber: "", password: "" };

        // Navigate to login
        navigate("/login");
      }
    } catch (err) {
      this.error = "Registration failed. Please try again.";
    } finally {
      this.loadingRegister = false;
    }
  };
}

export const registerStore = new RegisterStore();
