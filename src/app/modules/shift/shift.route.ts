import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ShiftValidations } from "./shift.validations";
import { ShiftController } from "./shift.controller";

const router = express.Router();

// Individual routes

router.post(
  "/create-shift",
  validateRequest(ShiftValidations.createShiftValidationSchema),
  ShiftController.createShift
);

router.put("/:id/assign", ShiftController.assignEmployee);

router.get("/", ShiftController.getAllShifts);

router.get("/:id", ShiftController.getSingleShift);

router.delete("/:id", ShiftController.deleteShift);

export const ShiftRoutes = router;
