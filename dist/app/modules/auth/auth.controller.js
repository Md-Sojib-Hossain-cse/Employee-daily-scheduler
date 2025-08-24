"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const config_1 = __importDefault(require("../../config"));
// Register User
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    const result = yield auth_service_1.AuthServices.createUserOnDB(userInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User has been registered successfully!",
        data: result,
    });
}));
// Login User
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    const result = yield auth_service_1.AuthServices.loginUserFromDB(userInfo);
    (0, sendResponse_1.default)(res.cookie("accessToken", result === null || result === void 0 ? void 0 : result.accessToken, {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    }), {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully!",
        data: result === null || result === void 0 ? void 0 : result.user,
    });
}));
// Logout User
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield auth_service_1.AuthServices.logoutUserFromDB(userId);
    (0, sendResponse_1.default)(res.cookie("accessToken", "", {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        sameSite: "none",
        maxAge: 0,
    }), {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged out successfully!",
        data: result,
    });
}));
exports.AuthController = {
    createUser,
    loginUser,
    logoutUser,
};
