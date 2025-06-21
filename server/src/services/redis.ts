import Redis from 'redis';

let redisClient: Redis.RedisClientType | null = null;

export async function initializeRedis() {
  try {
    if (process.env.NODE_ENV === 'test') {
      console.log('⚠️  Redis disabled in test mode');
      return;
    }

    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = Redis.createClient({
      url: redisUrl,
      retry_delay_on_failure: 100,
      max_attempts: 3,
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('🔄 Connecting to Redis...');
    });

    redisClient.on('ready', () => {
      console.log('✅ Redis client ready');
    });

    redisClient.on('end', () => {
      console.log('🔌 Redis connection closed');
    });

    await redisClient.connect();
    
    // Test the connection
    await redisClient.ping();
    console.log('✅ Connected to Redis');

  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    console.log('⚠️  Continuing without Redis (caching disabled)');
    redisClient = null;
  }
}

export async function closeRedis() {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log('✅ Redis connection closed gracefully');
    } catch (error) {
      console.error('❌ Error closing Redis connection:', error);
    }
  }
}

export function getRedisClient() {
  return redisClient;
}

// Cache utilities
export async function setCache(key: string, value: any, ttlSeconds: number = 3600) {
  if (!redisClient) return false;
  
  try {
    const serializedValue = JSON.stringify(value);
    await redisClient.setEx(key, ttlSeconds, serializedValue);
    return true;
  } catch (error) {
    console.error('❌ Redis SET error:', error);
    return false;
  }
}

export async function getCache(key: string) {
  if (!redisClient) return null;
  
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('❌ Redis GET error:', error);
    return null;
  }
}

export async function deleteCache(key: string) {
  if (!redisClient) return false;
  
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('❌ Redis DEL error:', error);
    return false;
  }
}

export async function setCachePattern(pattern: string, value: any, ttlSeconds: number = 3600) {
  if (!redisClient) return false;
  
  try {
    const keys = await redisClient.keys(pattern);
    const pipeline = redisClient.multi();
    
    keys.forEach(key => {
      pipeline.setEx(key, ttlSeconds, JSON.stringify(value));
    });
    
    await pipeline.exec();
    return true;
  } catch (error) {
    console.error('❌ Redis pattern SET error:', error);
    return false;
  }
}

export async function deleteCachePattern(pattern: string) {
  if (!redisClient) return false;
  
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    return true;
  } catch (error) {
    console.error('❌ Redis pattern DEL error:', error);
    return false;
  }
}

// Session management
export async function setUserSession(userId: string, sessionData: any, ttlSeconds: number = 86400) {
  return setCache(`session:${userId}`, sessionData, ttlSeconds);
}

export async function getUserSession(userId: string) {
  return getCache(`session:${userId}`);
}

export async function deleteUserSession(userId: string) {
  return deleteCache(`session:${userId}`);
}

// Rate limiting
export async function checkRateLimit(key: string, limit: number, windowSeconds: number) {
  if (!redisClient) return { allowed: true, remaining: limit };
  
  try {
    const current = await redisClient.incr(key);
    
    if (current === 1) {
      await redisClient.expire(key, windowSeconds);
    }
    
    const remaining = Math.max(0, limit - current);
    const allowed = current <= limit;
    
    return { allowed, remaining, current };
  } catch (error) {
    console.error('❌ Redis rate limit error:', error);
    return { allowed: true, remaining: limit };
  }
}

// Health check
export async function checkRedisHealth() {
  if (!redisClient) {
    return { status: 'disabled', timestamp: new Date() };
  }
  
  try {
    const start = Date.now();
    await redisClient.ping();
    const latency = Date.now() - start;
    
    return { 
      status: 'healthy', 
      latency: `${latency}ms`,
      timestamp: new Date() 
    };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error.message, 
      timestamp: new Date() 
    };
  }
}