import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { createError } from '../middleware/errorHandler';
import { User } from '../types';

const router = express.Router();

// In-memory user store (replace with database in production)
const users: User[] = [
  {
    id: '1',
    email: 'drax123@example.com',
    firstName: 'Drax',
    lastName: 'User',
    organization: 'QUADRAX Technologies',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Store hashed passwords separately (in production, this would be in the database)
const userPasswords: { [email: string]: string } = {
  'drax123@example.com': bcrypt.hashSync('@Pwd123456', 10)
};

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

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw createError('User already exists', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser: User = {
      id: uuidv4(),
      email,
      firstName,
      lastName,
      organization,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    userPasswords[email] = hashedPassword;

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: { ...newUser },
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

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    // Check password
    const hashedPassword = userPasswords[email];
    if (!hashedPassword || !await bcrypt.compare(password, hashedPassword)) {
      throw createError('Invalid credentials', 401);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user: { ...user },
        token
      }
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
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      throw createError('User not found', 404);
    }

    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: { token: newToken }
    });
  } catch (error) {
    next(error);
  }
});

export default router;