import { makeAutoObservable } from "mobx";
import { API, APIRoutes } from "../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { IProduct, productStore } from "./products.store";

export interface IWishlistItemResponse {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  customerId?: number;
  productId?: number;
}

class WishlistStore {
  // Map where key is wishlist item and value is product details
  userWishlistMap: Map<IWishlistItemResponse, IProduct> | undefined = undefined;
  loadingWishlish = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchWishlistByUserId = this.fetchWishlistByUserId.bind(this);
    this.createWishlist = this.createWishlist.bind(this);
    this.deleteWishlist = this.deleteWishlist.bind(this);
  }

  /**
   * Fetch wishlist by user ID and map it to include product details.
   */
  fetchWishlistByUserId = async (userId: number) => {
    this.loadingWishlish = true;
    try {
      const { data } = await API.get(APIRoutes.GET_WISHLIST_BY_USER_ID(userId));

      // If access directly via url
      if (!productStore.products) {
        await productStore.getProducts();
      }

      // Map wishlist items to their corresponding products
      const wishlistMap = new Map<IWishlistItemResponse, IProduct>();
      for (const item of data) {
        const product = productStore.products?.find(
          (pro) => pro.id === item.productId
        );
        if (product) {
          wishlistMap.set(item, product);
        }
      }

      this.userWishlistMap = wishlistMap;
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingWishlish = false;
    }
  };

  /**
   * Getter to list all product IDs in the wishlist.
   */
  get listProductIdsWishlist() {
    return Array.from(this.userWishlistMap?.keys() || []).map(
      (wl) => wl.productId
    );
  }

  /**
   * Add an item to the wishlist.
   */
  createWishlist = async (userId: number, productId: number) => {
    try {
      const { data } = await API.post(APIRoutes.CREATE_WISHLIST, {
        customerId: userId,
        productId,
      });

      if (data) {
        // Refresh the wishlist and show success alert
        await this.fetchWishlistByUserId(userId);

        const sweetAlert = withReactContent(Swal);
        sweetAlert.fire({
          title: "<p>Add wishlist successfully!</p>",
          timer: 800,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Remove an item from the wishlist.
   */
  deleteWishlist = async (wishlistId: number, userId: number) => {
    try {
      await API.delete(APIRoutes.DELETE_WISHLIST(wishlistId));

      // Refresh the wishlist and show success alert
      await this.fetchWishlistByUserId(userId);

      const sweetAlert = withReactContent(Swal);
      sweetAlert.fire({
        title: "<p>Wishlist item deleted successfully!</p>",
        timer: 800,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const wishlistStore = new WishlistStore();
