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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ResetFormValues, resetPasswordSchema } from "@/schema/restpasswordscheama";



export default function ResetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  async function handleReset(values: ResetFormValues) {
    setIsLoading(true);
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword,
        }
      );
      
      if (res.status === 200) {
        toast.success("Password reset successfully! You can now login.");
        router.push("/login"); // redirect to login page
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Reset Password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleReset)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 dark:text-gray-200">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800 dark:text-gray-200">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <i className="fas fa-spinner animate-spin text-white"></i>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  </div>
);
}
