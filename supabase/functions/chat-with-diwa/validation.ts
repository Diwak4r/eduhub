
import type { ValidationResult } from './types.ts';

export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 2000);
}

export function validateMessage(message: string): ValidationResult {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required and must be a string' };
  }

  if (message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (message.length > 2000) {
    return { valid: false, error: 'Message too long (max 2000 characters)' };
  }

  return { valid: true };
}
