"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const employee_validations_1 = require("./employee.validations");
const employee_controller_1 = require("./employee.controller");
const router = express_1.default.Router();
// Individual routes
router.post("/create-employee", (0, validateRequest_1.default)(employee_validations_1.EmployeeValidations.createEmployeeValidationSchema), employee_controller_1.EmployeeController.createEmployee);
router.patch("/update-employee/:id", (0, validateRequest_1.default)(employee_validations_1.EmployeeValidations.updateEmployeeValidationSchema), employee_controller_1.EmployeeController.updateEmployee);
router.get("/", employee_controller_1.EmployeeController.getAllEmployees);
router.get("/:id", employee_controller_1.EmployeeController.getSingleEmployee);
router.delete("/:id", employee_controller_1.EmployeeController.deleteEmployee);
exports.EmployeeRoutes = router;
