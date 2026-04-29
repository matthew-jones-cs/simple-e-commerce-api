import express from "express";
import {authenticate} from "../middleware/authenticate.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";
import {allOrdersLimiter} from "../middleware/rateLimiter.js";
import {validateNewOrder, validateItemId, validateUpdate} from "../middleware/orderValidators.js";
import {addNewOrderHandler, getAllOrdersHandler, getOrderByIdHandler, getOrderByIdWithItemsHandler, updateOrderItemByIdHandler, deleteOrderByIdHandler} from "../controllers/orderController.js";
import { authorizeOrderOwnership } from "../middleware/authorizeOwnership.js";
import {validateId} from "../middleware/idValidator.js";
// Make the orderValidator

const router = express.Router();
router.post("/", allOrdersLimiter, authenticate, validateNewOrder, addNewOrderHandler);
router.get("/", allOrdersLimiter, authenticate, authorizeRoles("ADMIN"), getAllOrdersHandler);
router.get("/:id", allOrdersLimiter, validateId, authenticate, authorizeOrderOwnership, validateId, getOrderByIdHandler);
router.get("/:id/items", allOrdersLimiter, validateId, authenticate, authorizeOrderOwnership, validateId, getOrderByIdWithItemsHandler);
router.put("/:id/:itemId", allOrdersLimiter, authenticate, validateId, authorizeOrderOwnership, validateItemId, validateUpdate, authorizeRoles("SELLER"), updateOrderItemByIdHandler);
router.delete("/:id", allOrdersLimiter, authenticate, validateId, authorizeOrderOwnership, deleteOrderByIdHandler);


export default router;