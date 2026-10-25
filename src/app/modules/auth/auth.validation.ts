import { z } from 'zod';

export const createUserValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name cannot exceed 80 characters'),

  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .max(254, 'Email cannot exceed 254 characters')
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password cannot exceed 72 characters'),
});

export const loginUserValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .max(254, 'Email cannot exceed 254 characters')
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(1, 'Password is required')
    .max(72, 'Password cannot exceed 72 characters'),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
