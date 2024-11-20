export const APIRoutes = {
  // Auth
  LOGIN: "/users/login",

  // User
  REGISTER: "/users/register",
  GET_PROFILE_WITH_ORDERS: (id: string | number) => `/users/${id}`,

  // Products routes
  GET_PRODUCTS: "/products/product-client",
  GET_PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,

  // Order routes
  CREATE_ORDER: "/orders",
  GET_ORDERS_DETAIL: (id: string | number) => `/orders/${id}`,
  CANCEL_ORDER: (id: string | number) => `/orders/${id}`,

  //Wishlist
  GET_WISHLIST_BY_USER_ID: (id: string | number) => `/wishlist/${id}`,
  CREATE_WISHLIST: "wishlist",
  DELETE_WISHLIST: (wishId: string | number) => `/wishlist/${wishId}`,

  //Comment
  GET_COMMENTS_BY_PRODUCT_ID: (id: string | number) => `/comments/${id}`,
  CREATE_COMMENT: "/comments",
};
