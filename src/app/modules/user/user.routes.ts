import express from "express";
import { UserControllers } from "./user.controller";
// import auth from "../../middlewares/auth";
// import { userRole } from "./user.const";

const router = express.Router();

//individual routes

//get all user
router.get(
  "/",
  // auth(userRole["admin"]),
  // auth(userRole["super-admin"]),
  UserControllers.getAllUser
);

//get all admin user

router.get("/:id", UserControllers.getSingleUser);

router.patch("/:id", UserControllers.updateUser);

export const UserRoutes = router;
