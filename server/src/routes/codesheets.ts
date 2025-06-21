import express from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { CodeSheet } from '../types';

const router = express.Router();

// In-memory codesheet store (replace with database in production)
const codesheets: CodeSheet[] = [];

// Get all codesheets for user
router.get('/', async (req: AuthenticatedRequest, res, next) => {
  try {
    const userCodesheets = codesheets.filter(c => c.userId === req.user!.id);
    
    res.json({
      success: true,
      data: userCodesheets
    });
  } catch (error) {
    next(error);
  }
});

// Get codesheet by ID
router.get('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const codesheet = codesheets.find(c => c.id === req.params.id && c.userId === req.user!.id);
    
    if (!codesheet) {
      throw createError('Codesheet not found', 404);
    }

    res.json({
      success: true,
      data: codesheet
    });
  } catch (error) {
    next(error);
  }
});

// Create new codesheet
router.post('/', [
  body('name').trim().isLength({ min: 1 }),
  body('description').trim().isLength({ min: 1 }),
  body('language').isIn(['python', 'r', 'sql', 'javascript'])
], async (req: AuthenticatedRequest, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError('Validation failed', 400);
    }

    const { name, description, language, workstationId } = req.body;

    const newCodesheet: CodeSheet = {
      id: uuidv4(),
      name,
      description,
      content: {
        cells: [
          {
            id: uuidv4(),
            type: 'code',
            content: language === 'python' ? '# Welcome to QUADRAX•ML Codesheet\nprint("Hello, World!")' : '// Welcome to QUADRAX•ML Codesheet\nconsole.log("Hello, World!");',
            output: null
          }
        ]
      },
      language,
      status: 'idle',
      userId: req.user!.id,
      workstationId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    codesheets.push(newCodesheet);

    res.status(201).json({
      success: true,
      data: newCodesheet
    });
  } catch (error) {
    next(error);
  }
});

// Update codesheet content
router.put('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const codesheet = codesheets.find(c => c.id === req.params.id && c.userId === req.user!.id);
    
    if (!codesheet) {
      throw createError('Codesheet not found', 404);
    }

    const { content } = req.body;

    codesheet.content = content;
    codesheet.updatedAt = new Date();

    res.json({
      success: true,
      data: codesheet
    });
  } catch (error) {
    next(error);
  }
});

// Execute codesheet cell
router.post('/:id/execute/:cellId', async (req: AuthenticatedRequest, res, next) => {
  try {
    const codesheet = codesheets.find(c => c.id === req.params.id && c.userId === req.user!.id);
    
    if (!codesheet) {
      throw createError('Codesheet not found', 404);
    }

    const { cellId } = req.params;
    const cell = codesheet.content.cells.find((c: any) => c.id === cellId);

    if (!cell) {
      throw createError('Cell not found', 404);
    }

    codesheet.status = 'running';

    // Simulate code execution
    setTimeout(() => {
      const output = simulateCodeExecution(cell.content, codesheet.language);
      cell.output = output;
      codesheet.status = 'completed';
      codesheet.updatedAt = new Date();
    }, 1000);

    res.json({
      success: true,
      message: 'Cell execution started',
      data: codesheet
    });
  } catch (error) {
    next(error);
  }
});

// Delete codesheet
router.delete('/:id', async (req: AuthenticatedRequest, res, next) => {
  try {
    const codesheetIndex = codesheets.findIndex(c => c.id === req.params.id && c.userId === req.user!.id);
    
    if (codesheetIndex === -1) {
      throw createError('Codesheet not found', 404);
    }

    codesheets.splice(codesheetIndex, 1);

    res.json({
      success: true,
      message: 'Codesheet deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to simulate code execution
function simulateCodeExecution(code: string, language: string) {
  const outputs: { [key: string]: string[] } = {
    python: [
      'Hello, World!',
      'Execution completed successfully',
      'Data loaded: 1000 rows, 5 columns',
      'Model accuracy: 94.7%'
    ],
    javascript: [
      'Hello, World!',
      'Function executed successfully',
      'Array processed: 100 items',
      'Result: [1, 2, 3, 4, 5]'
    ],
    r: [
      '[1] "Hello, World!"',
      'Data frame created: 100 obs. of 3 variables',
      'Model fitted successfully',
      'R-squared: 0.847'
    ],
    sql: [
      'Query executed successfully',
      '50 rows affected',
      'Table created: users',
      'Index created on column: id'
    ]
  };

  const languageOutputs = outputs[language] || outputs.python;
  return languageOutputs[Math.floor(Math.random() * languageOutputs.length)];
}

export default router;