import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import { EDeliveryStatus, EPaymenMethod, EPaymentStatus } from "./order.store";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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
  createdAt?: string;
  cartItemDetails?: Array<ICartItemOrderResponse>;
}

export interface ICartItemOrderResponse {
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
    this.getDetailOrder = this.getDetailOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
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

  async cancelOrder() {
    const updateOrder = {
      ...this.orderDetail,
      paymentStatus: "DA_HUY_BO",
    };

    try {
      const { data } = await API.put(
        APIRoutes.CANCEL_ORDER(this.orderDetail?.id || 0),
        updateOrder
      );

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Cancel order successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.getDetailOrder(this.orderDetail?.id || 0);
    } catch (error) {
      console.error("There was an error updating the order!", error);
    }
  }

  get isNotYetApprovedDeliveryStatus(): boolean {
    return (
      (this.orderDetail?.deliveryStatus as string) === "CHUA_XET_DUYET" &&
      (this.orderDetail?.paymentStatus as string) !== "DA_HUY_BO"
    );
  }
}

export const orderDetailStore = new OrderDetailStore();
