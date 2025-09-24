export interface OrderTypeDet {
  _id: string;
  id?: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  paymentMethodType: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  cartItems?: {
    product?: {
      _id: string;
      title: string;
      imageCover: string;
    };
    count: number;
    price: number;
  }[];
  shippingAddress?: {
    city: string;
    details: string;
  };
}