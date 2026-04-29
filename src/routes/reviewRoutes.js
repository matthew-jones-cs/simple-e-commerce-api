import express from "express";
import {authenticate} from "../middleware/authenticate.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";
import {allReviewsLimiter} from "../middleware/rateLimiter.js";
import {validateNewReview, validateReviewUpdate} from "../middleware/reviewValidators.js";
import {addNewReviewHandler, getAllReviewsHandler, getReviewByIdHandler, getAllMyReviewsHandler, updateReviewByIdHandler, deleteReviewByIdHandler} from "../controllers/reviewController.js";
import { authorizeReviewOwnership } from "../middleware/authorizeOwnership.js";
import {validateId} from "../middleware/idValidator.js";
// Make the orderValidator

const router = express.Router();
router.post("/", allReviewsLimiter, authenticate, validateNewReview, addNewReviewHandler);
router.get("/", allReviewsLimiter, getAllReviewsHandler);
router.get("/me", allReviewsLimiter, authenticate, getAllMyReviewsHandler);
router.get("/:id", allReviewsLimiter, validateId, getReviewByIdHandler);

router.put("/:id", allReviewsLimiter, authenticate, validateId, authorizeReviewOwnership, validateReviewUpdate, updateReviewByIdHandler);
router.delete("/:id", allReviewsLimiter, authenticate, validateId, authorizeReviewOwnership, deleteReviewByIdHandler);


export default router;
