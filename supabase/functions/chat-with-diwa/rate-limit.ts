
import type { RateLimitData } from './types.ts';
import { RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW } from './constants.ts';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, RateLimitData>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}
