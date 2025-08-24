import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidations } from "./auth.validations";

const router = express.Router();

// Individual routes

router.post(
  "/register",
  validateRequest(AuthValidations.createUserValidationSchema),
  AuthController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthController.loginUser
);

router.post("/logout/:id", AuthController.logoutUser);

export const AuthRoutes = router;
