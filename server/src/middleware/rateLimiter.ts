import { Request, Response, NextFunction } from 'express';
import { checkRateLimit } from '../services/redis';
import { AuthenticatedRequest } from './auth';

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum number of requests per window
  keyGenerator?: (req: Request) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  onLimitReached?: (req: Request, res: Response) => void;
}

export const createRateLimiter = (options: RateLimitOptions) => {
  const {
    windowMs,
    max,
    keyGenerator = (req) => req.ip,
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    onLimitReached
  } = options;

  const windowSeconds = Math.ceil(windowMs / 1000);

  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const key = `rate_limit:${keyGenerator(req)}`;
      const { allowed, remaining, current } = await checkRateLimit(key, max, windowSeconds);

      // Set rate limit headers
      res.set({
        'X-RateLimit-Limit': max.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(Date.now() + windowMs).toISOString()
      });

      if (!allowed) {
        if (onLimitReached) {
          onLimitReached(req, res);
        }

        return res.status(429).json({
          success: false,
          error: 'Too many requests',
          retryAfter: windowSeconds
        });
      }

      // If we should skip counting this request based on response status
      if (skipSuccessfulRequests || skipFailedRequests) {
        const originalJson = res.json;
        
        res.json = function(data: any) {
          const shouldSkip = 
            (skipSuccessfulRequests && res.statusCode >= 200 && res.statusCode < 400) ||
            (skipFailedRequests && res.statusCode >= 400);

          if (shouldSkip) {
            // Decrement the counter since we're skipping this request
            checkRateLimit(`${key}:decrement`, -1, windowSeconds).catch(console.error);
          }

          return originalJson.call(this, data);
        };
      }

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      next(); // Continue without rate limiting on error
    }
  };
};

// Predefined rate limiters
export const authRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  keyGenerator: (req) => `auth:${req.ip}`,
  skipSuccessfulRequests: true
});

export const apiRateLimit = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  keyGenerator: (req: AuthenticatedRequest) => req.user ? `api:${req.user.id}` : `api:${req.ip}`
});

export const uploadRateLimit = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 uploads per hour
  keyGenerator: (req: AuthenticatedRequest) => `upload:${req.user?.id || req.ip}`
});

export const aiRateLimit = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 AI requests per minute
  keyGenerator: (req: AuthenticatedRequest) => `ai:${req.user?.id || req.ip}`
});