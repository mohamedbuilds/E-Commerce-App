import z from "zod";

export const checkoutSchema = z.object({
  details: z
    .string()
    .min(5, "Details must be at least 5 characters")
    .max(200, "Details must be at most 200 characters"),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
