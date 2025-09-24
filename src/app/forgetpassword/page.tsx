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
import { ForgetFormValues, forgetSchema } from "@/schema/forgetPassScheama";
import axios, { AxiosError } from "axios";
import { VerifyCodeFormValues, verifyCodeSchema } from "@/schema/verifyCodeSchema";
import { useRouter } from "next/navigation";;

export default function ForgetPassword() {
const [isEmailLoading, setIsEmailLoading] = useState(false);
const [isCodeLoading, setIsCodeLoading] = useState(false);
const router  = useRouter();

  const emailForm = useForm<ForgetFormValues>({
    resolver: zodResolver(forgetSchema),
    defaultValues: { email: "" },
  });

  // form للكود
  const codeForm = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  // إرسال الإيميل
  async function handelForget(values: ForgetFormValues) {
    setIsEmailLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        { email: values.email }
      );
      if (res.status == 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
        setIsEmailLoading(false);
         const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }finally{

        setIsEmailLoading(false);
    }
  }

  // تأكيد الكود
  async function handelRestCode(values: VerifyCodeFormValues) {
    setIsCodeLoading(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        { resetCode: values.resetCode }
      );
      console.log(res)
      if (res.status == 200) {
        toast.success("Code verified successfully! You can now reset your password.");
router.push("/resetPassword");
      }
    } catch {
        setIsCodeLoading(false);
      toast.error("Invalid code. Please try again.");
    }finally{

        setIsCodeLoading(false);
    }
  }

return (
    <div className="min-h-screen flex items-center justify-center text-foreground text-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>

        {/* Email Form */}
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handelForget)}
            className="flex flex-col gap-4 mb-6"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
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
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              disabled={isEmailLoading}
            >
              {isEmailLoading ? (
                <i className="fas fa-spinner animate-spin text-white"></i>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>

        {/* Code Form */}
        <Form {...codeForm}>
          <form
            onSubmit={codeForm.handleSubmit(handelRestCode)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={codeForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border border-gray-600 rounded-md px-3 py-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isCodeLoading}
              className="bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              {isCodeLoading ? (
                <i className="fas fa-spinner animate-spin text-white"></i>
              ) : (
                "Confirm Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
