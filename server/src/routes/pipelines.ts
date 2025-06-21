import express from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import cron from 'node-cron';
import { AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { Pipeline } from '../types';

const router = express.Router();

// In-memory pipeline store (replace with database in production)
const pipelines: Pipeline[] = [];
const scheduledJobs: { [pipelineId: string]: cron.ScheduledTask } = {};

// Get all pipelines for user
router.get('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userPipelines = pipelines.filter(p => p.userId === req.user!.id);
    
    res.json({
      success: true,
      data: userPipelines
    });
  } catch (error) {
    next(error);
  }
});

// Get pipeline by ID
router.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const pipeline = pipelines.find(p => p.id === req.params.id && p.userId === req.user!.id);
    
    if (!pipeline) {
      throw createError('Pipeline not found', 404);
    }

    res.json({
      success: true,
      data: pipeline
    });
  } catch (error) {
    next(error);
  }
});

// Create new pipeline
router.post('/', [
  body('name').trim().isLength({ min: 1 }),
  body('description').trim().isLength({ min: 1 }),
  body('config').isObject()
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { name, description, config, schedule } = req.body;

    const newPipeline: Pipeline = {
      id: uuidv4(),
      name,
      description,
      config,
      status: 'idle',
      schedule,
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Set up scheduled execution if schedule is provided
    if (schedule && cron.validate(schedule)) {
      const task = cron.schedule(schedule, () => {
        executePipeline(newPipeline.id);
      }, { scheduled: false });
      
      scheduledJobs[newPipeline.id] = task;
      task.start();
      
      newPipeline.nextRun = getNextRunTime(schedule);
    }

    pipelines.push(newPipeline);

    res.status(201).json({
      success: true,
      data: newPipeline
    });
  } catch (error) {
    next(error);
  }
});

// Run pipeline
router.post('/:id/run', async (req: AuthenticatedRequest, res, next) => {
  try {
    const pipeline = pipelines.find(p => p.id === req.params.id && p.userId === req.user!.id);
    
    if (!pipeline) {
      throw createError('Pipeline not found', 404);
    }

    if (pipeline.status === 'running') {
      throw createError('Pipeline is already running', 400);
    }

    await executePipeline(pipeline.id);

    res.json({
      success: true,
      data: pipeline
    });
  } catch (error) {
    next(error);
  }
});

// Stop pipeline
router.post('/:id/stop', async (req: AuthenticatedRequest, res, next) => {
  try {
    const pipeline = pipelines.find(p => p.id === req.params.id && p.userId === req.user!.id);
    
    if (!pipeline) {
      throw createError('Pipeline not found', 404);
    }

    if (pipeline.status !== 'running') {
      throw createError('Pipeline is not running', 400);
    }

    pipeline.status = 'idle';
    pipeline.updatedAt = new Date();

    res.json({
      success: true,
      data: pipeline
    });
  } catch (error) {
    next(error);
  }
});

// Get pipeline logs
router.get('/:id/logs', async (req: AuthenticatedRequest, res, next) => {
  try {
    const pipeline = pipelines.find(p => p.id === req.params.id && p.userId === req.user!.id);
    
    if (!pipeline) {
      throw createError('Pipeline not found', 404);
    }

    // Simulate logs
    const logs = [
      { timestamp: new Date(), level: 'INFO', message: 'Pipeline execution started' },
      { timestamp: new Date(), level: 'INFO', message: 'Data ingestion completed' },
      { timestamp: new Date(), level: 'INFO', message: 'Data processing in progress...' }
    ];

    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    next(error);
  }
});

// Delete pipeline
router.delete('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const pipelineIndex = pipelines.findIndex(p => p.id === req.params.id && p.userId === req.user!.id);
    
    if (pipelineIndex === -1) {
      throw createError('Pipeline not found', 404);
    }

    const pipeline = pipelines[pipelineIndex];

    // Stop scheduled job if exists
    if (scheduledJobs[pipeline.id]) {
      scheduledJobs[pipeline.id].stop();
      delete scheduledJobs[pipeline.id];
    }

    pipelines.splice(pipelineIndex, 1);

    res.json({
      success: true,
      message: 'Pipeline deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to execute pipeline
async function executePipeline(pipelineId: string) {
  const pipeline = pipelines.find(p => p.id === pipelineId);
  if (!pipeline) return;

  pipeline.status = 'running';
  pipeline.lastRun = new Date();
  pipeline.updatedAt = new Date();

  // Simulate pipeline execution
  setTimeout(() => {
    pipeline.status = Math.random() > 0.1 ? 'completed' : 'failed';
    pipeline.updatedAt = new Date();
    
    if (pipeline.schedule) {
      pipeline.nextRun = getNextRunTime(pipeline.schedule);
    }
  }, 10000); // 10 seconds simulation
}

// Helper function to get next run time
function getNextRunTime(schedule: string): Date {
  // This is a simplified implementation
  // In production, use a proper cron parser
  const now = new Date();
  return new Date(now.getTime() + 24 * 60 * 60 * 1000); // Next day
}

export default router;