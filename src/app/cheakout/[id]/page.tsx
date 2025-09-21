"use client";
import { CheakOutSession } from "@/CheakOutAction/CheakOutAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckoutFormValues, checkoutSchema } from "@/schema/cheakout.scheama";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CheakOut() {
  const [loads, setloads] = useState(false)
  const { id } = useParams();
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });
  async function handelCheakOut(values: CheckoutFormValues) {
    try {
      setloads(true)
          // Call Api
    const res = await CheakOutSession(id, "", values);
    if (res.status == "success") {
      window.location.href = res.session.url;
    }
    } catch (error) {
      setloads(false)
      console.log(error)
    }finally{
        setloads(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handelCheakOut)}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>details :</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-gray-400 rounded-md px-3 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone :</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>city :</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
  type="submit"
  className="mt-4 w-full py-2 text-lg cursor-pointer"
  disabled={loads} // يمنع كليك تاني وقت اللودينج
>
  {loads ? (
    <i className="fas fa-spinner fa-spin mr-2"></i> // ✅ FontAwesome spinner
  ) : (
    "Confirm Checkout"
  )}
</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
