import { param, body, oneOf, query } from 'express-validator';
import {handleValidationErrors} from "./handleValidationErrors.js";


export const validateSignUp = [
    body("email")
      .exists({values: "falsy"})
      .withMessage("Email must exist and be in Email format")
      .bail()
      .trim()
      .escape()
      .normalizeEmail()
      .isEmail()
      .withMessage("Email must be in email format"),
    body("password")
      .exists({valuse: "falsy"})
      .withMessage("Password must exist and contain a minimum of 8 characters and a maximum of 64 characters")
      .bail()
      .isLength({min: 8, max: 64})
      .withMessage("Password must contain a minimum of 8 characters and a maximum of 64 characters"),
    body("name")
      .exists({values: "falsy"})
      .trim()
      .escape()
      .withMessage("Name must exist"),
    body("address")
      .exists({values: "falsy"})
      .trim()
      .escape()
      .withMessage("Address must exist"),
    body("role")
      .optional()
      .isIn(["USER", "SELLER", "ADMIN"])
      .withMessage("If there is a Role, Role must be one of the following roles: USER, SELLER, or ADMIN"),
      
    handleValidationErrors
];

export const validateLogIn = [
    body("email")
      .exists({values: "falsy"})
      .withMessage("Email must exist and be in email format")
      .bail()
      .trim()
      .escape()
      .normalizeEmail()
      .isEmail()
      .withMessage("Email must be in email format"),
    body("password")
      .exists({valuse: "falsy"})
      .withMessage("Password must exist and contain a minimum of 8 characters and a maximum of 64 characters")
      .bail()
      .isLength({min: 8, max: 64})
      .withMessage("Password must contain a minimum of 8 characters and a maximum of 64 characters"),
    
    handleValidationErrors
];

export const validateUserUpdate = [
  body("name")
    .optional()
    .exists({values: "falsy"})
    .trim()
    .escape(),
  body("email")
    .optional()
    .exists({values: "falsy"})
    .withMessage("Email must exist and be in email format")
    .bail()
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email must be in email format"),
  body("address")
    .optional()
    .exists({values: "falsy"})
    .trim()
    .escape()
    .isString()
    .withMessage("Address must exist"),
  body("password")
    .optional()
    .exists({valuse: "falsy"})
    .isLength({min: 8, max: 64})
    .withMessage("Password must contain a minimum of 8 characters and a maximum of 64 characters"),
  body("role")
    .optional()
    .isIn(["USER", "SELLER", "ADMIN"])
    .withMessage("If there is a Role, Role must be one of the following roles: USER, SELLER, or ADMIN"),
  
  handleValidationErrors
];