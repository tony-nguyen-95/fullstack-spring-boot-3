export const APIRoutes = {
  // Auth
  LOGIN: "/users/login-admin",

  // Products routes
  GET_PRODUCTS: "/products",
  GET_PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  CREATE_PRODUCT: "/products",
  DELETE_PRODUCT: (id: string | number) => `/products/${id}`,
  UPDATE_PRODUCT: (id: string | number) => `/products/${id}`,

  // Order routes
  GET_ORDERS: "/orders",
  GET_ORDERS_DETAIL: (id: string | number) => `/orders/${id}`,
  CREATE_ORDERS: "/orders",
  DELETE_ORDERS: (id: string | number) => `/orders/${id}`,
  UPDATE_ORDERS: (id: string | number) => `/orders/${id}`,
};
