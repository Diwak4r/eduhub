
import { z } from 'zod';

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Full name is required'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Chat validation schema
export const chatMessageSchema = z.object({
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message too long (max 1000 characters)')
    .refine((msg) => {
      // Basic XSS prevention - check for script tags and suspicious patterns
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /<object/i,
        /<embed/i
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(msg));
    }, 'Message contains potentially unsafe content')
});

// Resource validation schema
export const resourceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  type: z.enum(['Articles', 'Tutorials', 'Tools', 'Videos', 'PDFs']),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ChatMessageData = z.infer<typeof chatMessageSchema>;
export type ResourceFormData = z.infer<typeof resourceSchema>;
