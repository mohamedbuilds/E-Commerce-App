import z from "zod";

export const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .min(4, { message: "Reset code must be at least 4 characters" })
    .max(6, { message: "Reset code must not exceed 6 characters" }),
});

export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;