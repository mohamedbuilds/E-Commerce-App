"use client";
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
import { RegisterFormValues, registerSchema } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register() {
  const [load, setload] = useState(false);
  const route = useRouter();
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  async function handelRgister(values: RegisterFormValues) {
    console.log(values);
    // Call Api

    try {
      setload(true);
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(response);
      if (response.data.message == "success") {
        toast.success("Registered successfully");
        route.push("/login");
      } else {
      }
    } catch (error: unknown) {
      setload(false);
      // Type guard
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setload(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-foreground text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register Now</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handelRgister)}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name :</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email :</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password :</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* RePassword */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rePassword :</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone :</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4 w-full py-2 text-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
              {load ? (
                <i className="fas fa-spinner animate-spin text-white"></i>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
