"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shift_validations_1 = require("./shift.validations");
const shift_controller_1 = require("./shift.controller");
const router = express_1.default.Router();
// Individual routes
router.post("/create-shift", (0, validateRequest_1.default)(shift_validations_1.ShiftValidations.createShiftValidationSchema), shift_controller_1.ShiftController.createShift);
router.put("/:id/assign", shift_controller_1.ShiftController.assignEmployee);
router.get("/", shift_controller_1.ShiftController.getAllShifts);
router.get("/:id", shift_controller_1.ShiftController.getSingleShift);
router.delete("/:id", shift_controller_1.ShiftController.deleteShift);
exports.ShiftRoutes = router;
