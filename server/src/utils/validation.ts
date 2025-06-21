import { body, param, query, ValidationChain } from 'express-validator';

// Common validation rules
export const commonValidations = {
  id: param('id').isUUID().withMessage('Invalid ID format'),
  email: body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  name: (field: string) => body(field)
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`${field} must be between 1 and 100 characters`),
  description: body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  pagination: [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('sort').optional().isIn(['asc', 'desc']).withMessage('Sort must be asc or desc'),
    query('sortBy').optional().isString().withMessage('SortBy must be a string')
  ]
};

// Workstation validations
export const workstationValidations = {
  create: [
    commonValidations.name('name'),
    commonValidations.description,
    body('function')
      .isIn(['DEVELOPMENT', 'TRAINING', 'PROCESSING', 'INFERENCE', 'AUTOMATION', 'CUSTOM'])
      .withMessage('Invalid workstation function'),
    body('nature')
      .isArray({ min: 1 })
      .withMessage('Nature must be an array with at least one item'),
    body('resources')
      .optional()
      .isObject()
      .withMessage('Resources must be an object'),
    body('resources.cpu')
      .optional()
      .isInt({ min: 1, max: 32 })
      .withMessage('CPU must be between 1 and 32'),
    body('resources.memory')
      .optional()
      .isInt({ min: 1024, max: 131072 })
      .withMessage('Memory must be between 1024MB and 131072MB'),
    body('resources.storage')
      .optional()
      .isInt({ min: 10240, max: 1048576 })
      .withMessage('Storage must be between 10GB and 1TB')
  ],
  update: [
    commonValidations.id,
    commonValidations.description
  ]
};

// DataKit validations
export const datakitValidations = {
  create: [
    commonValidations.name('name'),
    commonValidations.description
  ],
  validate: [
    commonValidations.id,
    body('schema').optional().isObject().withMessage('Schema must be an object')
  ]
};

// Model validations
export const modelValidations = {
  create: [
    commonValidations.name('name'),
    commonValidations.description,
    body('type')
      .isIn(['CLASSIFICATION', 'REGRESSION', 'NLP', 'COMPUTER_VISION', 'CUSTOM'])
      .withMessage('Invalid model type'),
    body('framework')
      .isIn(['TENSORFLOW', 'PYTORCH', 'SCIKIT_LEARN', 'CUSTOM'])
      .withMessage('Invalid framework'),
    body('workstationId')
      .optional()
      .isUUID()
      .withMessage('Invalid workstation ID')
  ],
  predict: [
    commonValidations.id,
    body('inputs').isObject().withMessage('Inputs must be an object')
  ]
};

// Pipeline validations
export const pipelineValidations = {
  create: [
    commonValidations.name('name'),
    commonValidations.description,
    body('config').isObject().withMessage('Config must be an object'),
    body('schedule')
      .optional()
      .matches(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/)
      .withMessage('Invalid cron schedule format')
  ]
};

// CodeSheet validations
export const codesheetValidations = {
  create: [
    commonValidations.name('name'),
    commonValidations.description,
    body('language')
      .isIn(['PYTHON', 'R', 'SQL', 'JAVASCRIPT'])
      .withMessage('Invalid language'),
    body('workstationId')
      .optional()
      .isUUID()
      .withMessage('Invalid workstation ID')
  ],
  execute: [
    commonValidations.id,
    param('cellId').isUUID().withMessage('Invalid cell ID'),
    body('code').isString().withMessage('Code must be a string')
  ]
};

// VM validations
export const vmValidations = {
  create: [
    commonValidations.name('name'),
    commonValidations.description,
    body('image')
      .isIn(['ubuntu:20.04', 'python:3.9', 'node:18', 'jupyter/datascience-notebook'])
      .withMessage('Invalid image'),
    body('resources')
      .optional()
      .isObject()
      .withMessage('Resources must be an object')
  ]
};

// AI validations
export const aiValidations = {
  chat: [
    body('message')
      .trim()
      .isLength({ min: 1, max: 4000 })
      .withMessage('Message must be between 1 and 4000 characters'),
    body('sessionId')
      .isUUID()
      .withMessage('Invalid session ID')
  ],
  codeSuggest: [
    body('code')
      .trim()
      .isLength({ min: 1, max: 10000 })
      .withMessage('Code must be between 1 and 10000 characters'),
    body('language')
      .isIn(['python', 'javascript', 'r', 'sql'])
      .withMessage('Invalid language')
  ]
};

// User validations
export const userValidations = {
  updateProfile: [
    body('firstName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('First name must be between 1 and 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Last name must be between 1 and 50 characters'),
    body('organization')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Organization must be less than 100 characters')
  ]
};