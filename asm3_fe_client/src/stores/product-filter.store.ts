import { makeAutoObservable, reaction } from "mobx";
import { IProduct, productStore } from "./products.store";

export const sizeList = [38, 39, 40, 41, 42];

export const priceRangeFilter: Array<{ min: number; max: number }> = [
  { min: 0, max: 1000000 },
  { min: 1000000, max: 2000000 },
  { min: 2000000, max: 3000000 },
];

class ProductFilterStore {
  allProduct: IProduct[] | undefined = productStore.products;
  filteredProducts: IProduct[] | undefined;
  listCriterias: Array<{
    key: keyof IProduct | "availableSize";
    filterFn: (product: IProduct) => boolean;
    activeValue?: string | number;
  }> = [];

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => productStore.products,
      (productListFromHome) => {
        this.allProduct = productListFromHome;
        this.applyFilters();
      }
    );
  }

  private addOrReplaceCriteria(
    criteria: keyof IProduct | "availableSize",
    filterFn: (product: IProduct) => boolean,
    activeValue?: string | number
  ) {
    const existingIndex = this.listCriterias.findIndex(
      (c) => c.key === criteria
    );
    if (existingIndex !== -1) {
      this.listCriterias[existingIndex] = {
        key: criteria,
        filterFn,
        activeValue,
      };
    } else {
      this.listCriterias.push({ key: criteria, filterFn, activeValue });
    }
    this.applyFilters();
  }

  removelistCriterias(criteriaKey: keyof IProduct | "availableSize") {
    this.listCriterias = this.listCriterias.filter(
      (_criteria) => _criteria.key !== criteriaKey
    );
    this.applyFilters();
  }

  removeAllCriterias() {
    this.listCriterias = [];
    this.applyFilters();
  }

  applyFilters() {
    if (!this.allProduct) return;
    this.filteredProducts = this.allProduct.filter((product) =>
      this.listCriterias.every((criterion) => criterion.filterFn(product))
    );
  }

  contains(criteria: keyof IProduct, value: string) {
    this.addOrReplaceCriteria(
      criteria,
      (product) =>
        String(product[criteria]).toLowerCase().includes(value.toLowerCase()),
      value
    );
  }

  availableSize(size: number) {
    this.addOrReplaceCriteria(
      "availableSize",
      (product) =>
        product.productSizes?.some(
          (productSize) =>
            productSize.size === size && (productSize.quantity || 0) > 0
        ) || false,
      size
    );
  }

  between(criteria: keyof IProduct, min: number, max: number) {
    this.addOrReplaceCriteria(
      criteria,
      (product) => {
        const fieldValue = product[criteria];
        return (
          typeof fieldValue === "number" &&
          fieldValue >= min &&
          fieldValue <= max
        );
      },
      `${min.toLocaleString()} đ-${max.toLocaleString()} đ`
    );
  }

  clearFilters() {
    this.listCriterias = [];
    this.applyFilters();
  }

  get activeValues() {
    return this.listCriterias.map((ob) => ob.activeValue);
  }
}

export const productFilterStore = new ProductFilterStore();
