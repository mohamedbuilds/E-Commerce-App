import React from "react";
import getSpicitifyOrders from "@/api/getSpicitifyOrders";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { OrderType } from "@/Types/ordersType";

export default async function DetialsOrdars({ params }: { params: { id: string } }) {
  const { id } = params;

  const orders = await getSpicitifyOrders(id);

return (
  <div className="min-h-screen bg-background text-foreground mt-20 transition-colors duration-300">
    <div className="flex items-center justify-between mb-6 p-8">
      <h1 className="text-2xl font-bold transition-colors duration-300">
        Order Details
      </h1>
      <Link
        href="/allorders"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors duration-300"
      >
        Back to Orders
      </Link>
    </div>

    {/* Orders Grid */}
    <main className="max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {orders?.map((order: OrderType) => (
        <Card
          key={order?._id}
          className="bg-card text-card-foreground shadow-lg border border-border rounded-lg transition-colors duration-300"
        >
          <CardHeader className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground transition-colors duration-300">
              Created at: {new Date(order?.createdAt).toLocaleString()}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-primary font-bold">
                ${order?.totalOrderPrice}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold">Payment:</span>
              <span
                className={`px-2 py-1 rounded-full text-white text-sm ${
                  order?.isPaid ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {order?.paymentMethodType} ({order?.isPaid ? "Paid" : "Pending"})
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold">Delivery:</span>
              <span
                className={`px-2 py-1 rounded-full text-white text-sm ${
                  order?.isDelivered ? "bg-green-500" : "bg-orange-500"
                }`}
              >
                {order?.isDelivered ? "Delivered" : "Not Delivered"}
              </span>
            </div>

            <div className="border-t border-border pt-2 transition-colors duration-300">
              <h4 className="font-semibold transition-colors duration-300">
                Shipping Address
              </h4>
              <p>{order?.shippingAddress?.details}</p>
              <p>City: {order?.shippingAddress?.city}</p>
              <p>Phone: {order?.shippingAddress?.phone}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <span className="text-lg font-bold text-primary transition-colors duration-300">
              Total: ${order?.totalOrderPrice}
            </span>
          </CardFooter>
        </Card>
      ))}
    </main>
  </div>
);

}
