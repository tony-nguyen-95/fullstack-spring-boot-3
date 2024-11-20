import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";

export enum EBrand {
  ADIDAS = "ADIDAS",
  NIKE = "NIKE",
  PUMA = "PUMA",
  REEBOK = "REEBOK",
  UNDER_ARMOUR = "UNDER ARMOUR",
}

export enum ECategory {
  SHOE = "SHOE",
  ACCESSORIES = "ACCESSORIES",
}

export interface IProductSize {
  createdAt?: string;
  id?: number;
  quantity?: number;
  size?: number;
  updatedAt?: string;
}

// Define interface to match the project structure
export interface IProduct {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  isDelete?: boolean;
  name?: string;
  price?: number;
  status?: "available" | "unavailable";
  brand?: EBrand;
  category?: ECategory;
  imagePath?: string;
  productSizes?: IProductSize[];
}

class ProductStore {
  products: IProduct[] | undefined = undefined;
  $sizeOfPage: number = 3; // Default page size
  $currentPage: number = 1; // Default current page
  loadingProject: boolean = false;
  searchByProductName = "";

  constructor() {
    makeAutoObservable(this);
    this.getProducts = this.getProducts.bind(this);
  }

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  setSearchByProductName(keyword: string) {
    this.searchByProductName = keyword;
  }

  get isOnSearch() {
    return this.searchByProductName !== "";
  }

  async getProducts() {
    this.loadingProject = true;
    try {
      const response = await API.get(APIRoutes.GET_PRODUCTS);
      this.setProducts(response.data); // Assign data to store
    } catch (error) {
      console.error("There was an error getting the products!", error);
    } finally {
      this.loadingProject = false;
    }
  }

  get lengthOfProducts() {
    return this.products && this.products.length;
  }

  get sizeOfPages() {
    return this.$sizeOfPage;
  }

  get currentPage() {
    return this.$currentPage;
  }

  setPageSize(size: number) {
    this.$sizeOfPage = size;
  }

  setCurrentPage(page: number) {
    this.$currentPage = page;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.$sizeOfPage;
    const end = start + this.$sizeOfPage;
    return this.products && this.products.slice(start, end);
  }
}

export const productStore = new ProductStore();
