import { makeAutoObservable } from "mobx";
import { EBrand, ECategory } from "./products.store";
import { API, APIRoutes } from "../apis";

export interface IProductDetailResponse {
  id?: number;
  name?: string;
  status?: string;
  brand?: EBrand;
  category?: ECategory;
  description?: string;
  price?: number;
  imagePath?: string;

  size_38_quantity?: number;
  size_38_id?: number;

  size_39_quantity?: number;
  size_39_id?: number;

  size_40_quantity?: number;
  size_40_id?: number;

  size_41_quantity?: number;
  size_41_id?: number;

  size_42_quantity?: number;
  size_42_id?: number;
}

export interface ISizeAvailable {
  size?: number;
  quantity?: number;
  sizeId?: number;
}

export interface IProductDetail extends IProductDetailResponse {
  listSizeAvailable?: Array<ISizeAvailable>;
}

class ProductDetailStore {
  productDetail: IProductDetail | undefined = undefined;
  loadingDetail: boolean = false;
  selectedSize: ISizeAvailable | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.fetchProductDetail = this.fetchProductDetail.bind(this);
    this.setSelectedSize = this.setSelectedSize.bind(this);
  }

  fetchProductDetail = async (
    id: number,
    navigateError: (path: string) => void
  ) => {
    this.loadingDetail = true;
    try {
      const { data } = await API.get<IProductDetailResponse>(
        APIRoutes.GET_PRODUCT_DETAIL(id)
      );

      if (data) {
        // Transform size data into listSizeAvailable array
        const listSizeAvailable: ISizeAvailable[] = [
          {
            size: 38,
            quantity: data.size_38_quantity,
            sizeId: data.size_38_id,
          },
          {
            size: 39,
            quantity: data.size_39_quantity,
            sizeId: data.size_39_id,
          },
          {
            size: 40,
            quantity: data.size_40_quantity,
            sizeId: data.size_40_id,
          },
          {
            size: 41,
            quantity: data.size_41_quantity,
            sizeId: data.size_41_id,
          },
          {
            size: 42,
            quantity: data.size_42_quantity,
            sizeId: data.size_42_id,
          },
        ];

        this.productDetail = {
          ...data,
          listSizeAvailable,
        };

        this.selectedSize = listSizeAvailable.find(
          (item) => (item.quantity || 0) > 0
        );
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      navigateError("/");
    } finally {
      this.loadingDetail = false;
    }
  };

  setSelectedSize = (sizeAvailable: ISizeAvailable) => {
    this.selectedSize = sizeAvailable;
  };
}

export const productDetailStore = new ProductDetailStore();
