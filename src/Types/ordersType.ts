export interface OrderType {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  isPaid: boolean;
  paymentMethodType: string;
  isDelivered: boolean;
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
}