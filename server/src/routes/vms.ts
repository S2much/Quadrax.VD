import express from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { VirtualMachine } from '../types';
import { dockerService } from '../services/docker';

const router = express.Router();

// In-memory VM store (replace with database in production)
const virtualMachines: VirtualMachine[] = [];

// Get all VMs for user
router.get('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userVMs = virtualMachines.filter(vm => vm.userId === req.user!.id);
    
    res.json({
      success: true,
      data: userVMs
    });
  } catch (error) {
    next(error);
  }
});

// Get VM by ID
router.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const vm = virtualMachines.find(vm => vm.id === req.params.id && vm.userId === req.user!.id);
    
    if (!vm) {
      throw createError('Virtual Machine not found', 404);
    }

    res.json({
      success: true,
      data: vm
    });
  } catch (error) {
    next(error);
  }
});

// Create new VM
router.post('/', [
  body('name').trim().isLength({ min: 1 }),
  body('description').trim().isLength({ min: 1 }),
  body('image').isIn(['ubuntu:20.04', 'python:3.9', 'node:18', 'jupyter/datascience-notebook'])
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { name, description, image, resources } = req.body;

    const newVM: VirtualMachine = {
      id: uuidv4(),
      name,
      description,
      image,
      status: 'creating',
      resources: resources || {
        cpu: 2,
        memory: 4096,
        storage: 20480
      },
      ports: [],
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    virtualMachines.push(newVM);

    // Start container creation process
    dockerService.createVMContainer(newVM)
      .then(containerId => {
        newVM.containerId = containerId;
        newVM.status = 'running';
        newVM.ports = [8080, 8888]; // Assign random ports
        newVM.updatedAt = new Date();
      })
      .catch(error => {
        console.error('Failed to create VM container:', error);
        newVM.status = 'error';
        newVM.updatedAt = new Date();
      });

    res.status(201).json({
      success: true,
      data: newVM
    });
  } catch (error) {
    next(error);
  }
});

// Start VM
router.post('/:id/start', async (req: AuthenticatedRequest, res, next) => {
  try {
    const vm = virtualMachines.find(vm => vm.id === req.params.id && vm.userId === req.user!.id);
    
    if (!vm) {
      throw createError('Virtual Machine not found', 404);
    }

    if (vm.status === 'running') {
      throw createError('VM is already running', 400);
    }

    if (vm.containerId) {
      await dockerService.startContainer(vm.containerId);
    }

    vm.status = 'running';
    vm.updatedAt = new Date();

    res.json({
      success: true,
      data: vm
    });
  } catch (error) {
    next(error);
  }
});

// Stop VM
router.post('/:id/stop', async (req: AuthenticatedRequest, res, next) => {
  try {
    const vm = virtualMachines.find(vm => vm.id === req.params.id && vm.userId === req.user!.id);
    
    if (!vm) {
      throw createError('Virtual Machine not found', 404);
    }

    if (vm.status === 'stopped') {
      throw createError('VM is already stopped', 400);
    }

    if (vm.containerId) {
      await dockerService.stopContainer(vm.containerId);
    }

    vm.status = 'stopped';
    vm.updatedAt = new Date();

    res.json({
      success: true,
      data: vm
    });
  } catch (error) {
    next(error);
  }
});

// Get VM logs
router.get('/:id/logs', async (req: AuthenticatedRequest, res, next) => {
  try {
    const vm = virtualMachines.find(vm => vm.id === req.params.id && vm.userId === req.user!.id);
    
    if (!vm) {
      throw createError('Virtual Machine not found', 404);
    }

    // Simulate logs
    const logs = [
      { timestamp: new Date(), message: 'VM started successfully' },
      { timestamp: new Date(), message: 'Services initialized' },
      { timestamp: new Date(), message: 'Ready to accept connections' }
    ];

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
});

// Delete VM
router.delete('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const vmIndex = virtualMachines.findIndex(vm => vm.id === req.params.id && vm.userId === req.user!.id);
    
    if (vmIndex === -1) {
      throw createError('Virtual Machine not found', 404);
    }

    const vm = virtualMachines[vmIndex];

    // Remove container if exists
    if (vm.containerId) {
      await dockerService.removeContainer(vm.containerId);
    }

    virtualMachines.splice(vmIndex, 1);

    res.json({
      success: true,
      message: 'Virtual Machine deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;