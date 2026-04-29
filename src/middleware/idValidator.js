import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
    param('id')
      .trim()
      .escape()
      .isInt({ min: 1 })
      .withMessage('Id must be a positive integer'),
  
    handleValidationErrors,
  ];