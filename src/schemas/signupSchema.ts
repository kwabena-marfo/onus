import { z } from "zod";

export default z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters" }),

    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      })
      .optional()
      .or(z.literal("")),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    // .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    // .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    // .regex(/[0-9]/, { message: "Password must include a number" })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Password must include a special character",
    // })
    confirmPassword: z.string().min(1, { message: "Please confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
