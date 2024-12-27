import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export type TLogin = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = LoginSchema.pick({ email: true });
export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "Token is required." }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const RegisterSchema = LoginSchema.extend({
  fullname: z.string().min(1, { message: "Fullname is required." }),
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
  userType: z.string().min(1),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type TRegister = z.infer<typeof RegisterSchema>;
