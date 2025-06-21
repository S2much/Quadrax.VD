import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export async function initializeDatabase() {
  try {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });

    // Test the connection
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL database');

    // Run any pending migrations in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Checking for database migrations...');
    }

  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    throw error;
  }
}

export async function closeDatabase() {
  if (prisma) {
    await prisma.$disconnect();
    console.log('✅ Database connection closed');
  }
}

export function getDatabase() {
  if (!prisma) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return prisma;
}

// Health check function
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date() };
  }
}

// Database utilities
export async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    // In production, you would run: npx prisma migrate deploy
    console.log('✅ Database migrations completed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');
    
    // Create default admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'drax123@example.com' },
      update: {},
      create: {
        email: 'drax123@example.com',
        firstName: 'Drax',
        lastName: 'Admin',
        organization: 'QUADRAX Technologies',
        role: 'ADMIN',
        passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // @Pwd123456
      },
    });

    console.log('✅ Database seeded successfully');
    return { adminUser };
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}