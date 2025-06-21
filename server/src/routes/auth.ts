import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { getDatabase } from '../services/database';
import { setUserSession, deleteUserSession } from '../services/redis';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').trim().isLength({ min: 1 }),
  body('lastName').trim().isLength({ min: 1 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { email, password, firstName, lastName, organization } = req.body;
    const db = getDatabase();

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw createError('User already exists', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        organization,
        passwordHash,
        role: 'USER'
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        organization: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Generate JWT
    const token = jwt.sign(
      { 
        id: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Store session in Redis
    await setUserSession(newUser.id, {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      loginTime: new Date()
    }, 86400); // 24 hours

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { email, password } = req.body;
    const db = getDatabase();

    // Find user with password
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401);
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Store session in Redis
    await setUserSession(user.id, {
      userId: user.id,
      email: user.email,
      role: user.role,
      loginTime: new Date()
    }, 86400); // 24 hours

    // Remove password from response
    const { passwordHash, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// Logout
router.post('/logout', async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
        await deleteUserSession(decoded.id);
      } catch (error) {
        // Token might be invalid, but we still want to logout
        console.warn('Invalid token during logout:', error.message);
      }
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      throw createError('Refresh token required', 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    const db = getDatabase();
    
    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        organization: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      throw createError('User not found', 404);
    }

    const newToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Update session in Redis
    await setUserSession(user.id, {
      userId: user.id,
      email: user.email,
      role: user.role,
      refreshTime: new Date()
    }, 86400);

    res.json({
      success: true,
      data: { 
        token: newToken,
        user 
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;