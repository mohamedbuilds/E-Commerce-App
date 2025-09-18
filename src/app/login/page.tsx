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
import { LoginFormValues, loginSchema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  async function handelLogin(values: LoginFormValues) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    setIsLoading(false);

    if (response?.ok) {
      toast.success("Login successful!");
      window.location.href = "/";
    } else {
      toast.error(response?.error || "Login failed!");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login Now</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handelLogin)}
            className="flex flex-col gap-4"
          >
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password :</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* RePassword */}

            <Button
              className="mt-4 w-full py-2 text-lg flex justify-center items-center cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner animate-spin text-white"></i>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
