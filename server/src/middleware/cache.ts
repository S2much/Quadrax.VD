import { Request, Response, NextFunction } from 'express';
import { getCache, setCache } from '../services/redis';
import { AuthenticatedRequest } from './auth';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  keyGenerator?: (req: Request) => string;
  condition?: (req: Request) => boolean;
}

export const cacheMiddleware = (options: CacheOptions = {}) => {
  const {
    ttl = 300, // 5 minutes default
    keyGenerator = (req) => `cache:${req.method}:${req.originalUrl}`,
    condition = (req) => req.method === 'GET'
  } = options;

  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Skip caching if condition is not met
    if (!condition(req)) {
      return next();
    }

    try {
      const cacheKey = keyGenerator(req);
      
      // Add user ID to cache key for user-specific data
      const userSpecificKey = req.user ? `${cacheKey}:user:${req.user.id}` : cacheKey;
      
      // Try to get from cache
      const cachedData = await getCache(userSpecificKey);
      
      if (cachedData) {
        console.log(`Cache HIT: ${userSpecificKey}`);
        return res.json(cachedData);
      }

      console.log(`Cache MISS: ${userSpecificKey}`);

      // Store original json method
      const originalJson = res.json;

      // Override json method to cache the response
      res.json = function(data: any) {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          setCache(userSpecificKey, data, ttl).catch(error => {
            console.error('Cache SET error:', error);
          });
        }
        
        // Call original json method
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next(); // Continue without caching on error
    }
  };
};

export const invalidateCache = (pattern: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Store original json method
    const originalJson = res.json;

    // Override json method to invalidate cache after successful response
    res.json = function(data: any) {
      // Only invalidate cache for successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userPattern = req.user ? pattern.replace(':userId', req.user.id) : pattern;
        
        // Import deleteCachePattern dynamically to avoid circular dependency
        import('../services/redis').then(({ deleteCachePattern }) => {
          deleteCachePattern(userPattern).catch(error => {
            console.error('Cache invalidation error:', error);
          });
        });
      }
      
      // Call original json method
      return originalJson.call(this, data);
    };

    next();
  };
};