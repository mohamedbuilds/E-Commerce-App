import React from "react";
import getAllOrder from "@/api/getAllOrders";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { OrderTypeDet } from "@/Types/oderDet";

export default async function page() {
  const orders = await getAllOrder();

return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
        All Orders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order: OrderTypeDet) => (
          <Link
            key={order?._id}
            href={`/allorders/${order?.user?._id}`} // الرابط اللي هتفتح عليه تفاصيل الأوردر
            className="block"
          >
            <Card className="relative bg-gradient-to-tr from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 border-b">
                <CardTitle className="flex justify-between items-center text-lg font-semibold text-gray-800">
                  Order #{order?.id || "N/A"}
                  <Badge
                    variant={order?.isPaid ? "default" : "destructive"}
                    className={`px-3 py-1 text-sm font-medium ${
                      order?.isPaid
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order?.isPaid ? "Paid" : "Not Paid"}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-700">
                    <span className="font-semibold">User:</span>{" "}
                    {order?.user?.name || "N/A"} ({order?.user?.email || "N/A"})
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <span className="font-semibold">Payment Method:</span>
                    <Badge
                      className={`px-2 py-1 text-sm font-medium ${
                        order?.paymentMethodType === "card"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {order?.paymentMethodType || "N/A"}
                    </Badge>
                  </p>
                  <p className="text-gray-900 font-bold text-lg">
                    Total Price: {order?.totalOrderPrice || 0} EGP
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">Products:</span>
                  <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {order?.cartItems?.map((item,index) => (
                      <li
                        key={item?.product?._id + "-" + index}
                        className="flex items-center gap-4 border-b last:border-b-0 pb-2"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                          <Image
                            src={item?.product?.imageCover || "/placeholder.png"}
                            alt={item?.product?.title || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item?.product?.title || "N/A"}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item?.count || 0} x {item?.price || 0} EGP
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Shipping:</span>{" "}
                  {order?.shippingAddress?.city || "N/A"},{" "}
                  {order?.shippingAddress?.details || "N/A"}
                </p>
              </CardContent>

              <CardFooter className="p-4 flex justify-end bg-gradient-to-r from-gray-50 to-gray-100 border-t">
                <Badge
                  className={`px-3 py-1 text-sm font-medium ${
                    order?.isDelivered
                      ? "bg-green-300 text-green-900"
                      : "bg-orange-200 text-orange-800"
                  }`}
                >
                  {order?.isDelivered ? "Delivered" : "Pending"}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
