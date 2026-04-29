import express from "express";

import {authenticate} from "../middleware/authenticate.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";
import {validateUserUpdate} from "../middleware/userValidators.js";
import {getAllUsersHandler, getUserByIdHandler, updateUserByIdHandler, deleteUserByIdHandler} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getAllUsersHandler);
router.get("/me", authenticate, getUserByIdHandler);
router.put("/me", authenticate, validateUserUpdate, updateUserByIdHandler);
router.delete("/me", authenticate, deleteUserByIdHandler);
router.put("/:id/role", authenticate, authorizeRoles("ADMIN"), validateUserUpdate, updateUserByIdHandler);

export default router;