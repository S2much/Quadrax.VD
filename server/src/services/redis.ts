import Redis from 'redis';

let redisClient: any = null;

export async function initializeRedis() {
  try {
    // In production, connect to actual Redis instance
    console.log('Redis service initialized (mock mode)');
    
    // redisClient = Redis.createClient({
    //   url: process.env.REDIS_URL || 'redis://localhost:6379'
    // });
    // 
    // await redisClient.connect();
    // console.log('Connected to Redis');
    
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // In development, continue without Redis
  }
}

export function getRedisClient() {
  return redisClient;
}

export async function closeRedis() {
  if (redisClient) {
    await redisClient.quit();
  }
}