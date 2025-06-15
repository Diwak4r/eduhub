
export interface ChatRequest {
  message: string;
  mode?: 'lite' | 'steroids';
  isModeSwitching?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface RateLimitData {
  count: number;
  resetTime: number;
}
