export const apiEndpoints = {
  admin: {
    login: "/api/admin/login",
    products: "/api/admin/products",
    userById: (id: string) => `/api/admin/users/${id}`,
    users: "/api/admin/users",
  },
  auth: {
    login: "/api/login",
    logout: "/api/logout",
    otpVerification: "/api/otp-verification",
    passwordChange: "/api/password-change",
    userRegister: "/api/user-register",
  },
  cart: {
    base: "/api/cart",
    itemById: (id: string) => `/api/cart/items/${id}`,
    items: "/api/cart/items",
  },
  orders: {
    base: "/api/orders",
    byId: (id: string) => `/api/orders/${id}`,
    confirm: "/api/order-confirm",
  },
  products: {
    base: "/api/products",
    byId: (id: string) => `/api/products/${id}`,
    detailMock: "/api/products-detail",
  },
  toppings: {
    base: "/api/toppings",
  },
  user: {
    current: "/api/users/me",
  },
} as const;
