import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateNewReview = [
    body("itemId")
      .exists({values: "falsy"})
      .withMessage("itemId must exist and be greater than or equal to 1")
      .bail()
      .isInt({min: 1})
      .withMessage("itemId must be greater than or equal to 1"),
    body("title")
      .exists({values: "falsy"})
      .withMessage("title must exist and be a string")
      .bail()
      .isString()
      .withMessage("title must be a string"),
    body("content")
      .exists({values: "falsy"})
      .withMessage("content must exist and be a string")
      .bail()
      .isString()
      .withMessage("content must be a string"),
    body("rating")
      .exists({values: "falsy"})
      .withMessage("rating must exist and be be a valid value.")
      .bail()
      .isIn(["One", "Two", "Three", "Four", "Five"])
      .withMessage("rating must be a valid value."),

    handleValidationErrors
];

export const validateReviewUpdate = [
    body("title")
      .optional()
      .exists({values: "falsy"})
      .withMessage("title must exist and be a string")
      .bail()
      .isString()
      .withMessage("title must be a string"),
    body("content")
      .optional()
      .exists({values: "falsy"})
      .withMessage("content must exist and be a string")
      .bail()
      .isString()
      .withMessage("content must be a string"),
    body("rating")
      .optional()
      .exists({values: "falsy"})
      .withMessage("rating must exist and be be a valid value.")
      .bail()
      .isIn(["One", "Two", "Three", "Four", "Five"])
      .withMessage("rating must be a valid value."),
    handleValidationErrors
];