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
  const [loads, setloads] = useState(false);
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
    const idStr = Array.isArray(id) ? id[0] : id; // لو id array خد أول عنصر، لو string سيبه
    if (!idStr) return; // لو id مش موجود، متعملش حاجة

    try {
      setloads(true);
      // Call Api
      const res = await CheakOutSession(idStr, "", values);
      if (res.status == "success") {
        window.location.href = res.session.url;
      }
    } catch (error) {
      setloads(false);
      console.log(error);
    } finally {
      setloads(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-lg shadow-lg transition-colors duration-300">
        <h1 className="text-2xl font-bold text-center mb-6 transition-colors duration-300">
          Checkout
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handelCheakOut)}
            className="flex flex-col gap-4"
          >
            {/* Details */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Details:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-border rounded-md px-3 py-2 w-full bg-card focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Phone:</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      className="border border-border rounded-md px-3 py-2 w-full bg-card focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">City:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="border border-border rounded-md px-3 py-2 w-full bg-card focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-300"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4 w-full py-2 text-lg cursor-pointer"
              disabled={loads}
            >
              {loads ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
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
