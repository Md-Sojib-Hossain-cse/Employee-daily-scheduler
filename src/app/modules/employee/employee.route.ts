import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EmployeeValidations } from "./employee.validations";
import { EmployeeController } from "./employee.controller";

const router = express.Router();

// Individual routes

router.post(
  "/create-employee",
  validateRequest(EmployeeValidations.createEmployeeValidationSchema),
  EmployeeController.createEmployee
);

router.patch(
  "/update-employee/:id",
  validateRequest(EmployeeValidations.updateEmployeeValidationSchema),
  EmployeeController.updateEmployee
);

router.get("/", EmployeeController.getAllEmployees);

router.get("/:id", EmployeeController.getSingleEmployee);

router.delete("/:id", EmployeeController.deleteEmployee);

export const EmployeeRoutes = router;
