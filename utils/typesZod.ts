import { z } from "zod";

// Define your base schema using Zod
const BaseSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
});

// Define the refined schema with password confirmation validation
export const EmailRegisterZod = BaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  }
);

// Define the schema for the login form by omitting `confirmPassword`
export const EmailLoginZod = BaseSchema.omit({ confirmPassword: true });
