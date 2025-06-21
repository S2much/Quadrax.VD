import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { DataKit } from '../types';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', 'datakits');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.csv', '.json', '.xlsx', '.xls', '.txt', '.parquet'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed types: CSV, JSON, Excel, TXT, Parquet'));
    }
  }
});

// In-memory datakit store (replace with database in production)
const datakits: DataKit[] = [];

// Get all datakits for user
router.get('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userDatakits = datakits.filter(d => d.userId === req.user!.id);
    
    res.json({
      success: true,
      data: userDatakits
    });
  } catch (error) {
    next(error);
  }
});

// Get datakit by ID
router.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const datakit = datakits.find(d => d.id === req.params.id && d.userId === req.user!.id);
    
    if (!datakit) {
      throw createError('DataKit not found', 404);
    }

    res.json({
      success: true,
      data: datakit
    });
  } catch (error) {
    next(error);
  }
});

// Upload new dataset
router.post('/upload', upload.single('dataset'), async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!req.file) {
      throw createError('No file uploaded', 400);
    }

    const { name, description } = req.body;

    if (!name || !description) {
      throw createError('Name and description are required', 400);
    }

    const newDatakit: DataKit = {
      id: uuidv4(),
      name,
      description,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: path.extname(req.file.originalname).toLowerCase(),
      filePath: req.file.path,
      status: 'processing',
      userId: req.user!.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    datakits.push(newDatakit);

    // Simulate data processing
    setTimeout(() => {
      newDatakit.status = 'ready';
      newDatakit.qualityScore = Math.floor(Math.random() * 20) + 80; // 80-100%
      newDatakit.updatedAt = new Date();
    }, 2000);

    res.status(201).json({
      success: true,
      data: newDatakit
    });
  } catch (error) {
    next(error);
  }
});

// Validate dataset
router.post('/:id/validate', async (req: AuthenticatedRequest, res, next) => {
  try {
    const datakit = datakits.find(d => d.id === req.params.id && d.userId === req.user!.id);
    
    if (!datakit) {
      throw createError('DataKit not found', 404);
    }

    // Simulate validation process
    const validationResults = {
      isValid: true,
      errors: [],
      warnings: ['Some missing values detected in column "age"'],
      qualityScore: Math.floor(Math.random() * 20) + 80,
      rowCount: Math.floor(Math.random() * 10000) + 1000,
      columnCount: Math.floor(Math.random() * 20) + 5
    };

    datakit.qualityScore = validationResults.qualityScore;
    datakit.updatedAt = new Date();

    res.json({
      success: true,
      data: validationResults
    });
  } catch (error) {
    next(error);
  }
});

// Transform dataset
router.post('/:id/transform', async (req: AuthenticatedRequest, res, next) => {
  try {
    const datakit = datakits.find(d => d.id === req.params.id && d.userId === req.user!.id);
    
    if (!datakit) {
      throw createError('DataKit not found', 404);
    }

    const { transformations } = req.body;

    // Simulate transformation process
    datakit.status = 'processing';
    datakit.updatedAt = new Date();

    setTimeout(() => {
      datakit.status = 'ready';
      datakit.updatedAt = new Date();
    }, 3000);

    res.json({
      success: true,
      message: 'Transformation started',
      data: datakit
    });
  } catch (error) {
    next(error);
  }
});

// Delete datakit
router.delete('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const datakitIndex = datakits.findIndex(d => d.id === req.params.id && d.userId === req.user!.id);
    
    if (datakitIndex === -1) {
      throw createError('DataKit not found', 404);
    }

    const datakit = datakits[datakitIndex];

    // Delete file from filesystem
    try {
      await fs.unlink(datakit.filePath);
    } catch (error) {
      console.warn('Failed to delete file:', error);
    }

    datakits.splice(datakitIndex, 1);

    res.json({
      success: true,
      message: 'DataKit deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;