import express from "express";

import {logInLimiter, signUpLimiter} from "../middleware/rateLimiter.js";
import {validateSignUp, validateLogIn} from "../middleware/userValidators.js";
import {signUpHandler, logInHandler} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", logInLimiter, validateLogIn, logInHandler);

router.post("/signup", signUpLimiter, validateSignUp, signUpHandler);


export default router;