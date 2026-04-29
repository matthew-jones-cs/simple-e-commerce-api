import express from "express";

import {allItemsLimiter} from "../middleware/rateLimiter.js";
import {authenticate} from "../middleware/authenticate.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";
import {validateNewItem, validateItemUpdate, validateQuery} from "../middleware/itemValidators.js";
import {addItemHandler, getAllItemsHandler, getItemByIdHandler, updateItemByIdHandler, deleteItemByIdHandler} from "../controllers/itemController.js";
import { authorizeItemOwnership } from "../middleware/authorizeOwnership.js";
import {validateId} from "../middleware/idValidator.js";



const router = express.Router();

router.post("/", authenticate, validateNewItem, authorizeRoles("ADMIN", "SELLER"), addItemHandler);
router.get("/", allItemsLimiter, authenticate, getAllItemsHandler);
router.get("/:id", allItemsLimiter, authenticate, validateId, validateQuery, getItemByIdHandler);
router.put("/:id", allItemsLimiter, authenticate, validateId, authorizeItemOwnership, validateQuery, validateItemUpdate, authorizeRoles("ADMIN", "SELLER"), updateItemByIdHandler);
router.delete("/:id", authenticate, validateId, authorizeItemOwnership, authorizeRoles("SELLER"), validateQuery, deleteItemByIdHandler);

export default router;