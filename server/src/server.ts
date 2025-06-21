import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import workstationRoutes from './routes/workstations';
import datakitRoutes from './routes/datakits';
import modelRoutes from './routes/models';
import pipelineRoutes from './routes/pipelines';
import codesheetRoutes from './routes/codesheets';
import vmRoutes from './routes/vms';
import aiRoutes from './routes/ai';
import userRoutes from './routes/users';

// Import middleware
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

// Import services
import { initializeDatabase } from './services/database';
import { initializeRedis } from './services/redis';
import { initializeDocker } from './services/docker';
import { setupSocketHandlers } from './services/socket';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(limiter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/workstations', authenticateToken, workstationRoutes);
app.use('/api/datakits', authenticateToken, datakitRoutes);
app.use('/api/models', authenticateToken, modelRoutes);
app.use('/api/pipelines', authenticateToken, pipelineRoutes);
app.use('/api/codesheets', authenticateToken, codesheetRoutes);
app.use('/api/vms', authenticateToken, vmRoutes);
app.use('/api/ai', authenticateToken, aiRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize services and start server
async function startServer() {
  try {
    console.log('🚀 Starting QUADRAX•ML Backend...');
    
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database initialized');
    
    // Initialize Redis
    await initializeRedis();
    console.log('✅ Redis connected');
    
    // Initialize Docker
    await initializeDocker();
    console.log('✅ Docker service initialized');
    
    // Setup Socket.IO handlers
    setupSocketHandlers(io);
    console.log('✅ Socket.IO handlers configured');
    
    server.listen(PORT, () => {
      console.log(`🌟 QUADRAX•ML Backend running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

startServer();

export { io };