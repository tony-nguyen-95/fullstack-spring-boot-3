import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import { EBrand, ECategory } from "./project-form.store";

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
}

class ProductStore {
  products: IProduct[] = [];
  $sizeOfPage: number = 10; // Default page size
  $currentPage: number = 1; // Default current page
  loadingProject: boolean = false;
  filteredProducts: IProduct[] = [];
  isOnFilter = false;

  constructor() {
    makeAutoObservable(this);
    this.setPageSize = this.setPageSize.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.filterProductsByKey = this.filterProductsByKey.bind(this);
    this.setIsOnFilter = this.setIsOnFilter.bind(this);
  }

  setProducts(products: IProduct[]) {
    this.products = products;
    this.filteredProducts = products;
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

  get lengthOfItems() {
    return this.products.length;
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
    return this.products.slice(start, end);
  }

  filterProductsByKey(key: keyof IProduct, value: any) {
    if (!value) {
      this.filteredProducts = this.products; // Reset to all products if no filter value
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product[key]?.toString().toLowerCase().includes(value)
      );
    }
  }

  setIsOnFilter() {
    this.isOnFilter = !this.isOnFilter;
  }

  get displayProduct() {
    if (this.isOnFilter) {
      return this.filteredProducts;
    }

    return this.paginatedProducts;
  }
}

export const productStore = new ProductStore();
