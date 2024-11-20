import { makeAutoObservable, reaction } from "mobx";
import { API, APIRoutes } from "../apis";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { productStore } from "./products.store";

export enum EBrand {
  ADIDAS = "ADIDAS",
  NIKE = "NIKE",
  PUMA = "PUMA",
  REEBOK = "REEBOK",
  UNDER_ARMOUR = "UNDER_ARMOUR",
}

export enum ECategory {
  SHOE = "SHOE",
  ACCESSORIES = "ACCESSORIES",
}

export interface IFormProduct {
  id?: number;
  name?: string;
  status?: string;
  brand?: EBrand;
  category?: ECategory;
  description?: string;
  price?: number;
  imagePath?: string;
  size_38_quantity?: number;
  size_39_quantity?: number;
  size_40_quantity?: number;
  size_41_quantity?: number;
  size_42_quantity?: number;
}

class ProductFormStore {
  formData: IFormProduct = {
    name: "",
    brand: EBrand.ADIDAS,
    category: ECategory.SHOE,
    description: "",
    price: 0,
    size_38_quantity: 0,
    size_39_quantity: 0,
    size_40_quantity: 0,
    size_41_quantity: 0,
    size_42_quantity: 0,
  };
  fileNameImage: File | undefined = undefined;
  typeOfForm: "add" | "update" | "delete" | undefined = undefined;
  errorForm: string = "";
  loadingForm: boolean = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.typeOfForm, // Observable to react to
      (typeOfForm) => {
        if (typeOfForm === "add") {
          this.formData.status = "available";
        }
      }
    );
  }

  setField<K extends keyof IFormProduct>(name: K, value: IFormProduct[K]) {
    this.formData[name] = value;
  }

  setFiles(file: File | null) {
    if (file) {
      this.fileNameImage = file;
    }
  }

  setError(err: string) {
    this.errorForm = err;
  }

  setTypeOfForm(type: typeof this.typeOfForm) {
    this.typeOfForm = type;
  }

  setFormData(form: typeof this.formData) {
    this.formData = { ...form };
  }

  resetForm() {
    this.formData = {
      name: "",
      brand: EBrand.ADIDAS,
      category: ECategory.SHOE,
      description: "",
      price: 0,
      size_38_quantity: 0,
      size_39_quantity: 0,
      size_40_quantity: 0,
      size_41_quantity: 0,
      size_42_quantity: 0,
    };
    this.fileNameImage = undefined;
    this.typeOfForm = undefined;
  }

  async getDetailProduct(id: string | number) {
    this.loadingForm = true;

    try {
      const { data } = await API.get(APIRoutes.GET_PRODUCT_DETAIL(id));

      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          this.setField(
            key as keyof IFormProduct,
            value as IFormProduct[keyof IFormProduct]
          );
        });
      }

      this.setTypeOfForm("update");
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingForm = false;
    }
  }

  async submitAddForm() {
    this.loadingForm = true;
    try {
      const formData = new FormData();
      Object.entries(this.formData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (this.fileNameImage) {
        formData.append("fileNameImage", this.fileNameImage);
      }

      const response = await API.post(APIRoutes.CREATE_PRODUCT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Product created successfully!</p>",
          timer: 1000,
          icon: "success",
        });
      }

      this.resetForm();
      productStore.getProducts();
    } catch (error) {
      console.error("There was an error adding the product!", error);
    } finally {
      this.loadingForm = false;
    }
  }

  async updateProduct() {
    this.loadingForm = true;
    try {
      const { data } = await API.put(
        APIRoutes.UPDATE_PRODUCT(this.formData.id || 0),
        this.formData
      );
      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Product updated successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();
      productStore.getProducts();
    } catch (error) {
      console.error("There was an error updating the project!", error);
    } finally {
      this.loadingForm = false;
    }
  }

  async deleteProduct() {
    this.loadingForm = true;
    try {
      const { data } = await API.delete(
        APIRoutes.DELETE_PRODUCT(this.formData.id || 0)
      );
      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Product deleted successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();
      productStore.getProducts();
    } catch (error) {
      console.error("There was an error deleting the Product!", error);
    } finally {
      this.loadingForm = false;
    }
  }
}

export const productFormStore = new ProductFormStore();
