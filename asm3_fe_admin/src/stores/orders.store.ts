import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";

export interface IOrder {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  consignee?: string;
  consigneePhone?: string;
  deliveryAddress?: string;
  deliveryStatus?: EDeliveryStatus;
  paymentMethod?: EPaymenMethod;
  paymentStatus?: EPaymentStatus;
  sentMail?: boolean;
  totalAmount?: number;
  user?: IUserOrderResponse;
}

export interface IUserOrderResponse {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  address?: string;
  dateOfBirth?: string;
  email?: string;
  gender?: string;
  imagePath?: string;
  isDelete?: string;
  name?: string;
  password?: string;
  phone?: string;
  role?: ERoleUser;
}

export enum ERoleUser {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export enum EPaymentStatus {
  CHO_THANH_TOAN_ATM = "Chờ thanh toán ATM",
  CHUA_THANH_TOAN = "Chưa thanh toán",
  DA_THANH_TOAN = "Đã thanh toán",
  DA_HOAN_TIEN = "Đã hoàn tiền",
  DA_HUY_BO = "Đã hủy bỏ",
}

export enum EPaymenMethod {
  ATM = "ATM",
  COD = "COD",
}

export enum EDeliveryStatus {
  CHUA_XET_DUYET = "Chưa xét duyệt",
  CHO_GIAO_HANG = "Chờ giao hàng",
  DANG_GIAO_HANG = "Đang giao hàng",
  DANG_GIAO_HANG_LAN_2 = "Đang giao hàng lần 2",
  GIAO_HANG_THANH_CONG = "Giao hàng thành công",
  DA_HUY = "Đã hủy",
}

class OrdersStore {
  orders: IOrder[] = [];
  $sizeOfPage: number = 100; // Default page size
  $currentPage: number = 1; // Default current page
  isOnFilter = false;
  filteredOrders: IOrder[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setOrders(orders: IOrder[]) {
    this.orders = orders;
    this.filteredOrders = orders;
  }

  async getOrders() {
    try {
      const response = await API.get(APIRoutes.GET_ORDERS);
      this.setOrders(response.data);
    } catch (error) {
      console.error("There was an error getting the posts!", error);
    }
  }

  get lengthOfItems() {
    return this.orders.length;
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

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.$sizeOfPage;
    const end = start + this.$sizeOfPage;
    return this.orders.slice(start, end);
  }

  filterProductsByKey(key: keyof IOrder, value: any) {
    if (!value) {
      this.filteredOrders = this.orders;
    } else {
      console.log(value);

      this.filteredOrders = this.orders.filter((product) => {
        return product[key]?.toString().toLowerCase().includes(value);
      });
    }
  }

  setIsOnFilter() {
    this.isOnFilter = !this.isOnFilter;
  }

  get displayOrder() {
    if (this.isOnFilter) {
      return this.filteredOrders;
    }

    return this.filteredOrders;
  }
}

export const ordersStore = new OrdersStore();
