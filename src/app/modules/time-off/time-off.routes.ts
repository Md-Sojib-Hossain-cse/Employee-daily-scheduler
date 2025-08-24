import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TimeOffValidations } from "./time-off.validations";
import { TimeOffController } from "./time-off.controller";

const router = express.Router();

router.post(
  "/create-time-off",
  validateRequest(TimeOffValidations.createTimeOffValidationSchema),
  TimeOffController.submitTimeOff
);

router.patch(
  "/:id/update",
  validateRequest(TimeOffValidations.updateTimeOffValidationSchema),
  TimeOffController.approveOrRejectTimeOff
);

router.get("/", TimeOffController.getAllTimeOff);

export const TimeOffRoutes = router;
