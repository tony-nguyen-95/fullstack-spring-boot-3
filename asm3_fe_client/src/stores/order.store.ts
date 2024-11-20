import { makeAutoObservable, reaction } from "mobx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { authStore } from "./auth.store";
import { API, APIRoutes } from "../apis";

export interface ICartItemOrder {
  productName?: string;
  productPrice?: number;
  productImagePath?: string;
  maxQuantity?: number;
  size?: number;
  quantity?: number;
  sizeId?: number;
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

export enum EPaymentStatus {
  CHO_THANH_TOAN_ATM = "Chờ thanh toán ATM",
  CHUA_THANH_TOAN = "Chưa thanh toán",
  DA_THANH_TOAN = "Đã thanh toán",
  DA_HOAN_TIEN = "Đã hoàn tiền",
  DA_HUY_BO = "Đã hủy bỏ",
}

export interface IOrderForm {
  consignee?: string;
  consigneePhone?: string;
  deliveryAddress?: string;
  paymentStatus?: keyof typeof EPaymentStatus;
  paymentMethod?: keyof typeof EPaymenMethod;
  sentMail?: boolean;
  totalAmount?: number;
  userId?: number;
  cartItems?: Array<ICartItemOrder>;
}

class OrderStore {
  orderForm: IOrderForm = {
    consignee: "",
    consigneePhone: "",
    deliveryAddress: "",
    paymentStatus: "CHUA_THANH_TOAN",
    paymentMethod: "COD",
    sentMail: false,
    userId: authStore.userLogined?.id,
  };

  cartItemsOrder: ICartItemOrder[] = [];

  loadingOrder: boolean = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => authStore.userLogined,
      (userLogined) => {
        if (userLogined) {
          this.orderForm.userId = userLogined.id;
        }
      }
    );
  }

  get cartLength() {
    return this.cartItemsOrder.length;
  }

  get totalPrice() {
    return this.cartItemsOrder.reduce(
      (acc, item) => acc + (item.productPrice || 0) * (item.quantity || 0),
      0
    );
  }

  addCart = (cartItem: ICartItemOrder) => {
    const cartItemFound = this.cartItemsOrder.find(
      (item) => item.sizeId === cartItem.sizeId
    );

    if (cartItemFound && cartItemFound.quantity) {
      cartItemFound.quantity++;
    } else {
      cartItem.quantity = 1;
      this.cartItemsOrder.push(cartItem);
    }

    const sweetAlert = withReactContent(Swal);
    sweetAlert.fire({
      title: "<p>Item added to cart successfully!</p>",
      timer: 800,
      icon: "success",
    });
  };

  incQuantity = (cartSizeId: number) => {
    const foundCartItem = this.cartItemsOrder.find(
      (item) => item.sizeId === cartSizeId
    );

    if (!foundCartItem || !foundCartItem.quantity || !foundCartItem.maxQuantity)
      return;

    if (foundCartItem.quantity < foundCartItem.maxQuantity) {
      foundCartItem.quantity++;
    } else {
      const sweetAlert = withReactContent(Swal);
      sweetAlert.fire({
        title: "<p>Not enough quantity in store!</p>",
        timer: 500,
        icon: "warning",
      });
    }
  };

  decQuantity = (cartSizeId: number) => {
    const foundCartItem = this.cartItemsOrder.find(
      (item) => item.sizeId === cartSizeId
    );

    if (foundCartItem && foundCartItem.quantity && foundCartItem.quantity > 1) {
      foundCartItem.quantity--;
    } else {
      this.cartItemsOrder = this.cartItemsOrder.filter(
        (item) => item.sizeId !== cartSizeId
      );

      const sweetAlert = withReactContent(Swal);
      sweetAlert.fire({
        title: "<p>Item removed from cart successfully!</p>",
        timer: 500,
        icon: "success",
      });
    }
  };

  deleteCart = (cartSizeId: number) => {
    this.cartItemsOrder = this.cartItemsOrder.filter(
      (item) => item.sizeId !== cartSizeId
    );

    const sweetAlert = withReactContent(Swal);
    sweetAlert.fire({
      title: "<p>Item deleted from cart successfully!</p>",
      timer: 500,
      icon: "success",
    });
  };

  // Order page
  setField = (field: keyof IOrderForm, value: string) => {
    this.orderForm[field] = value as any;
  };

  submitOrder = async () => {
    this.loadingOrder = true;
    try {
      if (!this.cartLength) return;

      // Add cart items to order form
      this.orderForm.cartItems = this.cartItemsOrder.map((cart) => ({
        quantity: cart.quantity,
        sizeId: cart.sizeId,
      }));

      // Make API request to create order
      const { data } = await API.post(APIRoutes.CREATE_ORDER, {
        ...this.orderForm,
        totalAmount: this.totalPrice,
      });

      if (data) {
        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Order successfully!</p>",
          timer: 500,
          icon: "success",
        });

        // Clear cart items and reset the form if needed
        this.orderForm = {
          consignee: "",
          consigneePhone: "",
          deliveryAddress: "",
          paymentStatus: "CHUA_THANH_TOAN",
          paymentMethod: "COD",
          sentMail: false,
          userId: authStore.userLogined?.id,
        };

        this.cartItemsOrder = [];
        this.orderForm.cartItems = [];
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingOrder = false;
    }
  };
}

export const orderStore = new OrderStore();
