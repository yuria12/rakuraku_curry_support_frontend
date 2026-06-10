export type UserRole = "user" | "admin";
export type CurrySize = "M" | "L";
export type ApiErrorStatus = 400 | 401 | 403 | 404 | 409;

export type ApiErrorResponse = Readonly<{
  message: string;
}>;

export type ApiUser = Readonly<{
  email: string;
  id: string;
  name: string;
  role: UserRole;
}>;

export type ApiAdminUser = ApiUser &
  Readonly<{
    isActive: boolean;
  }>;

export type ApiProduct = Readonly<{
  description: string;
  id: string;
  imagePath: string;
  name: string;
  priceL: number;
  priceM: number;
  spiceLevel: number;
}>;

export type ApiCartTopping = Readonly<{
  id: string;
  name: string;
  price: number;
}>;

export type ApiCartItem = Readonly<{
  imagePath: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  size: CurrySize | "—";
  toppings: ApiCartTopping[];
}>;

export type ApiCart = Readonly<{
  items: ApiCartItem[];
  shippingFee: number;
  subtotal: number;
  total: number;
}>;

export type ApiOrder = Readonly<{
  id: string;
  items: ApiCartItem[];
  orderedAt: string;
  shippingAddress: string;
  status: string;
  total: number;
}>;

export type LoginRequest = Readonly<{
  email: string;
  password: string;
}>;

export type LoginResponse = Readonly<{
  token: string;
  user: ApiUser;
}>;

export type UserRegisterRequest = Readonly<{
  address: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  postalCode: string;
}>;

export type MessageResponse = Readonly<{
  message: string;
}>;

export type PasswordChangeRequest = Readonly<{
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}>;

export type OtpVerificationRequest = Readonly<{
  code: string;
}>;

export type AddCartItemRequest = Readonly<{
  productId: string;
  quantity: number;
  size: CurrySize;
}>;

export type AddCartItemResponse = MessageResponse &
  Readonly<{
    cart: ApiCart;
  }>;

export type OrderConfirmResponse = Readonly<{
  cart: ApiCart;
  customer: {
    address: string;
    name: string;
    paymentMethod: string;
  };
}>;

export type CreateOrderRequest = Readonly<{
  cartItems?: ApiCartItem[];
  paymentMethod?: string;
  shippingAddress?: string;
}>;

export type CreateOrderResponse = MessageResponse &
  Readonly<{
    orderId: string;
  }>;

export type AdminCreateProductRequest = Readonly<{
  description?: string;
  imagePath?: string;
  name: string;
  priceL: number;
  priceM: number;
  spiceLevel?: number;
}>;

export type AdminCreateProductResponse = MessageResponse &
  Readonly<{
    product: ApiProduct;
  }>;

export type AdminUpdateUserRequest = Readonly<{
  email?: string;
  name?: string;
  role?: UserRole;
}>;

export type AdminUpdateUserResponse = MessageResponse &
  Readonly<{
    user: ApiAdminUser;
  }>;
