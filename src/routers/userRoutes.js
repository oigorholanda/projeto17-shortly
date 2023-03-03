import { Router } from "express";
import { createClient, loginClient } from "../controllers/userController.js";
import { signinValidate, signupValidate } from "../middlewares/userMiddlewares.js";

const router = Router();

router.post("/signup", )
router.post("/signin",)

router.post('/signup', signupValidate, createClient);
router.post('/signin', signinValidate, loginClient);

export default router