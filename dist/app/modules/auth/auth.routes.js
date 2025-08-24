"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validations_1 = require("./auth.validations");
const router = express_1.default.Router();
// Individual routes
router.post("/register", (0, validateRequest_1.default)(auth_validations_1.AuthValidations.createUserValidationSchema), auth_controller_1.AuthController.createUser);
router.post("/login", (0, validateRequest_1.default)(auth_validations_1.AuthValidations.loginUserValidationSchema), auth_controller_1.AuthController.loginUser);
router.post("/logout/:id", auth_controller_1.AuthController.logoutUser);
exports.AuthRoutes = router;
