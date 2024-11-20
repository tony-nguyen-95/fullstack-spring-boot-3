import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import {
  EDeliveryStatus,
  EPaymenMethod,
  EPaymentStatus,
  ordersStore,
} from "./orders.store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export interface IOrderDetail {
  id?: number;
  consignee?: string;
  consigneePhone?: string;
  deliveryAddress?: string;
  deliveryStatus?: EDeliveryStatus;
  userName?: string;
  paymentMethod?: EPaymenMethod;
  paymentStatus?: EPaymentStatus;
  sentMail?: boolean;
  totalAmount?: number;
  userId?: number;
  cartItemDetails?: Array<ICartItemOrder>;
}

export interface ICartItemOrder {
  quantity?: number;
  sizeId?: number;
  productId?: number;
  cartItemId?: number;
  productName?: string;
  productPrice?: number;
  size?: number;
}

class OrderDetailStore {
  orderDetail: IOrderDetail | undefined = undefined;
  loadingOrderDetail: boolean = false;
  error: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setError(err: string) {
    this.error = err;
  }

  async getDetailOrder(id: number) {
    this.loadingOrderDetail = true;

    try {
      const { data } = await API.get(APIRoutes.GET_ORDERS_DETAIL(id));

      if (data) {
        this.orderDetail = data;
      }
    } catch (error) {
      console.log(error);
      this.setError("Something goes wrong");
    }
  }

  async updateDeliveryStatusOrder(status: EDeliveryStatus) {
    const updateOrder = { ...this.orderDetail, deliveryStatus: status };

    try {
      const { data } = await API.put(
        APIRoutes.UPDATE_ORDERS(this.orderDetail?.id || 0),
        updateOrder
      );

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Order delivery status updated successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.getDetailOrder(this.orderDetail?.id || 0);
    } catch (error) {
      console.error("There was an error updating the order!", error);
    }
  }

  async updatePaymentStatusOrder(status: EPaymentStatus) {
    const updateOrder = { ...this.orderDetail, paymentStatus: status };

    try {
      const { data } = await API.put(
        APIRoutes.UPDATE_ORDERS(this.orderDetail?.id || 0),
        updateOrder
      );

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Order payment status updated successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.getDetailOrder(this.orderDetail?.id || 0);
    } catch (error) {
      console.error("There was an error updating the order!", error);
    }
  }

  async deleteOrder() {
    try {
      const { data } = await API.delete(
        APIRoutes.DELETE_ORDERS(this.orderDetail?.id || 0)
      );

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Orders deleted successfully!</p>",
          timer: 800,
          icon: "success",
        });

        this.orderDetail = undefined;
        ordersStore.getOrders(); // Fetch updated orders list
      }
    } catch (error) {
      console.error("There was an error deleting the project!", error);
    }
  }
}

export const orderDetailStore = new OrderDetailStore();
