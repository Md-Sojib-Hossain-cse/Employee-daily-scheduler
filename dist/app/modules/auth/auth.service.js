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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const auth_model_1 = require("./auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleAppError_1 = __importDefault(require("../../errors/handleAppError"));
const http_status_1 = __importDefault(require("http-status"));
// Register a new user
const createUserOnDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.AuthModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isUserExists) {
        throw new handleAppError_1.default(http_status_1.default.CONFLICT, "User already exist!");
    }
    const result = yield auth_model_1.AuthModel.create(payload);
    return result;
});
// Login user
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.AuthModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!isUserExists) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist!");
    }
    // Compare hashed password
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatched) {
        throw new handleAppError_1.default(http_status_1.default.UNAUTHORIZED, "Wrong credentials!");
    }
    // Update active status
    const user = yield auth_model_1.AuthModel.findByIdAndUpdate(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id, { isActive: true }, { new: true });
    //removing password from payload
    if (user) {
        user.password = "";
    }
    // JWT payload
    const jwtPayload = {
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    // Access token
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "24h",
    });
    return {
        user,
        accessToken,
    };
});
// Logout user
const logoutUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_model_1.AuthModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    return {};
});
exports.AuthServices = {
    createUserOnDB,
    loginUserFromDB,
    logoutUserFromDB,
};
