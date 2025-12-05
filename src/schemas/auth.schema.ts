import { z } from 'zod';

// Password validation with requirements
const passwordSchema = z.string()
   .min(8, 'Password must be at least 8 characters')
   .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
   .regex(/[0-9]/, 'Password must contain at least one number');

export const loginSchema = z.object({
   email: z.string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
   password: z.string()
      .min(1, 'Password is required'),
});

export const registrationSchema = z.object({
   firstName: z.string()
      .min(1, 'First name is required')
      .max(50, 'First name must be less than 50 characters'),
   lastName: z.string()
      .min(1, 'Last name is required')
      .max(50, 'Last name must be less than 50 characters'),
   email: z.string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
   password: passwordSchema,
   confirmPassword: z.string()
      .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
   email: z.string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
   token: z.string().min(1, 'Token is required'),
   password: passwordSchema,
   confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});

export const changePasswordSchema = z.object({
   currentPassword: z.string().min(1, 'Current password is required'),
   newPassword: passwordSchema,
   confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
   message: "Passwords don't match",
   path: ["confirmNewPassword"],
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
