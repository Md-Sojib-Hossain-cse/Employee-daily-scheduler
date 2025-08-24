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
exports.AuthModel = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required to create a User!"],
    },
    email: {
        type: String,
        required: [true, "Email is required to create a User!"],
        unique: [true, "User with this Email is already Exists!"],
    },
    password: {
        type: String,
        required: [true, "Password is required to create a User!"],
    },
    role: {
        type: String,
        enum: ["admin", "hr", "employee"],
        default: "employee",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});
//Pre middleware to encrypt password
authSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
//removing password from document for security
authSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
// Remove passwords from results
authSchema.post("find", function (docs, next) {
    docs.forEach((doc) => {
        if (doc && doc.password) {
            doc.password = "";
        }
    });
    next();
});
exports.AuthModel = (0, mongoose_1.model)("user", authSchema);
