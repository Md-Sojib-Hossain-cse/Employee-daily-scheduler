"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const time_off_validations_1 = require("./time-off.validations");
const time_off_controller_1 = require("./time-off.controller");
const router = express_1.default.Router();
router.post("/create-time-off", (0, validateRequest_1.default)(time_off_validations_1.TimeOffValidations.createTimeOffValidationSchema), time_off_controller_1.TimeOffController.submitTimeOff);
router.patch("/:id/update", (0, validateRequest_1.default)(time_off_validations_1.TimeOffValidations.updateTimeOffValidationSchema), time_off_controller_1.TimeOffController.approveOrRejectTimeOff);
router.get("/", time_off_controller_1.TimeOffController.getAllTimeOff);
exports.TimeOffRoutes = router;
