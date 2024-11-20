import { makeAutoObservable } from "mobx";
import { EDeliveryStatus, EPaymenMethod, EPaymentStatus } from "./order.store";
import { API, APIRoutes } from "../apis";

export interface ProfileWithOrdersResponse {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  orders?: IOrderResponse[];
}

export interface IOrderResponse {
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
}

class ProfileWithOrdersStore {
  profileWithOrder: ProfileWithOrdersResponse | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.fetchProfileWithOrder = this.fetchProfileWithOrder.bind(this);
  }

  fetchProfileWithOrder = async (userId: number | string) => {
    try {
      const { data } = await API.get(APIRoutes.GET_PROFILE_WITH_ORDERS(userId));

      if (data) {
        this.profileWithOrder = data;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const profileWithOrdersStore = new ProfileWithOrdersStore();
