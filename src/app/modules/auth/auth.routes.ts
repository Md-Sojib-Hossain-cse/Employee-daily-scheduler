import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validations";

const router = express.Router();

// Individual routes

router.post("/register" , validateRequest(AuthValidations.registerUser) , AuthController.registerUser);

router.post("/login"  , validateRequest(AuthValidations.loginUser) , AuthController.loginUser);

router.post("/logout/:id" , AuthController.logOutUser)


export const AuthRoutes = router;