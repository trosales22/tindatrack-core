import { z } from "zod";

export const businessSalesSchema = z.object({
  customer_name: z
    .string()
    .max(100, "Customer Name must be at most 100 characters")
    .optional()
    .nullable(),
  remarks: z
    .string()
    .max(300, "Remarks must be at most 300 characters")
    .optional()
    .nullable(),
});

export type BusinessSalesFormData = z.infer<typeof businessSalesSchema>;
