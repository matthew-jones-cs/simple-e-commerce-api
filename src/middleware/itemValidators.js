import { param, body, oneOf, query } from 'express-validator';
import {handleValidationErrors} from "./handleValidationErrors.js";

export const validateNewItem = [
    body("name")
      .exists({values: "falsy"})
      .trim()
      .escape()
      .isString()
      .withMessage("Name must exist"),
    body("price")
      .exists({values: "falsy"})
      .isDecimal() // I should add a minimum value too
      .withMessage("Price must be a decimal exist and be positive"),
    body("amount")
      .exists({values: "falsy"})
      .isInt({min: 0})
      .withMessage("Amount must be greater than or equal to 0"),
    body("description")
      .exists({values: "falsy"})
      .trim()
      .escape()
      .isString()
      .withMessage("Description must be a string and exist"),

    handleValidationErrors
];

export const validateItemUpdate = [
    body("name")
      .optional()
      .exists({values: "falsy"})
      .trim()
      .escape()
      .isString()
      .withMessage("Name must exist"),
    body("price")
      .optional()
      .exists({values: "falsy"})
      .isDecimal() // I should add a minimum value too
      .withMessage("Price must be a decimal exist and be positive"),
    body("amount")
      .optional()
      .exists({values: "falsy"})
      .isInt({min: 0})
      .withMessage("Amount must be greater than or equal to 0"),
    body("description")
      .optional()
      .exists({values: "falsy"})
      .trim()
      .escape()
      .isString()
      .withMessage("Description must be a string and exist"),

    handleValidationErrors
];

export const validateQuery = [
    param("id")
      .optional()
      .exists({values: "falsy"})
      .trim()
      .escape()
      .isInt({min: 1})
      .withMessage("Id if provided must be a positive integer"),

    handleValidationErrors
];