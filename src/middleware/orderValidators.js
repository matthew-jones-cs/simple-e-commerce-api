import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateItemId = [
    param("itemId")
      .trim()
      .escape()
      .isInt({ min: 1 })
      .withMessage("Id must be a positive integer"),
  
    handleValidationErrors,
  ];

export const validateNewOrder = [
    body("itemIds")
      .exists({values: "falsy"})
      .isArray({min: 1})
      .withMessage("The itemIds array must exist and contain 1 or more elements."),
    body("itemIds.*")
      .exists({values: "falsy"})
      .withMessage("All individual itemIds exist")
      .bail()
      .trim()
      .escape()
      .isInt({ min: 1 })
      .withMessage("itemIds must be greate than or equal to 1"),
    body("quantites")
      .exists({values: "falsy"})
      .isArray({min: 1})
      .withMessage("The quantites array must exists and contain 1 or more elements.")
      .bail()
      .custom((value, {req}) => { return (req.body.itemIds.length === value.length)})
      .withMessage("itemIds and quantites must be of the same length."),
    body("quantites.*")
      .exists({values: "falsy"})
      .withMessage("All individual quantites exist")
      .bail()
      .trim()
      .escape()
      .isInt({ min: 1 })
      .withMessage("The individual quantitys must be greater than or equal to 1"),
    handleValidationErrors
];

export const validateUpdate = [
    body("quantity")
      .exists({values: "falsy"})
      .withMessage("The quantity must exists and be greater than or equal to 1.")
      .bail()
      .isInt({ min: 1 })
      .withMessage("quantity must be greater than or equal to 1."),
    handleValidationErrors
];