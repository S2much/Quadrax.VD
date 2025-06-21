import express from 'express';
import { body, validationResult } from 'express-validator';
import { AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// Get user profile
router.get('/profile', async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user!;
    
    // Remove sensitive information
    const { ...userProfile } = user;
    
    res.json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/profile', [
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('organization').optional().trim()
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { firstName, lastName, organization } = req.body;
    const user = req.user!;

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (organization !== undefined) user.organization = organization;
    user.updatedAt = new Date();

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// Get user statistics
router.get('/stats', async (req: AuthenticatedRequest, res, next) => {
  try {
    // Simulate user statistics
    const stats = {
      workstations: Math.floor(Math.random() * 10) + 1,
      datakits: Math.floor(Math.random() * 20) + 5,
      models: Math.floor(Math.random() * 15) + 3,
      pipelines: Math.floor(Math.random() * 8) + 2,
      codesheets: Math.floor(Math.random() * 25) + 10,
      totalProjects: Math.floor(Math.random() * 50) + 20,
      storageUsed: Math.floor(Math.random() * 10) + 2, // GB
      computeHours: Math.floor(Math.random() * 100) + 50
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

export default router;