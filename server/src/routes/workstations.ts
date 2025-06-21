import express from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { Workstation } from '../types';
import { dockerService } from '../services/docker';

const router = express.Router();

// In-memory workstation store (replace with database in production)
const workstations: Workstation[] = [];

// Get all workstations for user
router.get('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userWorkstations = workstations.filter(w => w.userId === req.user!.id);
    
    res.json({
      success: true,
      data: userWorkstations
    });
  } catch (error) {
    next(error);
  }
});

// Get workstation by ID
router.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const workstation = workstations.find(w => w.id === req.params.id && w.userId === req.user!.id);
    
    if (!workstation) {
      throw createError('Workstation not found', 404);
    }

    res.json({
      success: true,
      data: workstation
    });
  } catch (error) {
    next(error);
  }
});

// Create new workstation
router.post('/', [
  body('name').trim().isLength({ min: 3, max: 50 }),
  body('description').trim().isLength({ min: 10 }),
  body('function').isIn(['development', 'training', 'processing', 'inference', 'automation', 'custom']),
  body('nature').isArray({ min: 1 })
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { name, description, function: workstationFunction, nature, resources } = req.body;

    // Check if workstation name already exists for user
    const existingWorkstation = workstations.find(w => 
      w.name === name && w.userId === req.user!.id
    );
    
    if (existingWorkstation) {
      throw createError('Workstation name already exists', 409);
    }

    const newWorkstation: Workstation = {
      id: uuidv4(),
      name,
      description,
      function: workstationFunction,
      nature,
      status: 'creating',
      resources: resources || {
        cpu: 2,
        memory: 4096,
        storage: 20480,
        gpu: false
      },
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    workstations.push(newWorkstation);

    // Start container creation process
    dockerService.createWorkstationContainer(newWorkstation)
      .then(containerId => {
        newWorkstation.containerId = containerId;
        newWorkstation.status = 'running';
        newWorkstation.updatedAt = new Date();
      })
      .catch(error => {
        console.error('Failed to create workstation container:', error);
        newWorkstation.status = 'error';
        newWorkstation.updatedAt = new Date();
      });

    res.status(201).json({
      success: true,
      data: newWorkstation
    });
  } catch (error) {
    next(error);
  }
});

// Start workstation
router.post('/:id/start', async (req: AuthenticatedRequest, res, next) => {
  try {
    const workstation = workstations.find(w => w.id === req.params.id && w.userId === req.user!.id);
    
    if (!workstation) {
      throw createError('Workstation not found', 404);
    }

    if (workstation.status === 'running') {
      throw createError('Workstation is already running', 400);
    }

    if (workstation.containerId) {
      await dockerService.startContainer(workstation.containerId);
    }

    workstation.status = 'running';
    workstation.updatedAt = new Date();

    res.json({
      success: true,
      data: workstation
    });
  } catch (error) {
    next(error);
  }
});

// Stop workstation
router.post('/:id/stop', async (req: AuthenticatedRequest, res, next) => {
  try {
    const workstation = workstations.find(w => w.id === req.params.id && w.userId === req.user!.id);
    
    if (!workstation) {
      throw createError('Workstation not found', 404);
    }

    if (workstation.status === 'stopped') {
      throw createError('Workstation is already stopped', 400);
    }

    if (workstation.containerId) {
      await dockerService.stopContainer(workstation.containerId);
    }

    workstation.status = 'stopped';
    workstation.updatedAt = new Date();

    res.json({
      success: true,
      data: workstation
    });
  } catch (error) {
    next(error);
  }
});

// Delete workstation
router.delete('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const workstationIndex = workstations.findIndex(w => w.id === req.params.id && w.userId === req.user!.id);
    
    if (workstationIndex === -1) {
      throw createError('Workstation not found', 404);
    }

    const workstation = workstations[workstationIndex];

    // Remove container if exists
    if (workstation.containerId) {
      await dockerService.removeContainer(workstation.containerId);
    }

    workstations.splice(workstationIndex, 1);

    res.json({
      success: true,
      message: 'Workstation deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;