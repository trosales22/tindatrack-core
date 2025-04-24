import { z } from "zod";

export const businessSchema = z.object({
  name: z.string().nonempty("Business Name is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  mobile: z.string().regex(/^(09\d{9}|639\d{9}|\+639\d{9})$/, "Invalid phone number format").optional(),
  photo_url: z.string().url("Invalid image URL").nullable().optional(),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be less than 16 characters").nullable().optional(),
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().nonempty("Last name is required")
});

export type BusinessFormData = z.infer<typeof businessSchema>;
