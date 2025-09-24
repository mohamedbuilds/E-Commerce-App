import z from "zod";

export const forgetSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    resetCode: z
      .string()
      .min(4, { message: "Reset code must be at least 4 characters" })
      .max(6, { message: "Reset code must not exceed 6 characters" })
      .optional(),
  })

export type ForgetFormValues = z.infer<typeof forgetSchema>;
