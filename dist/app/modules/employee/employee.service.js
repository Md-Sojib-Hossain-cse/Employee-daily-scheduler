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
exports.EmployeeServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const employee_model_1 = require("./employee.model");
const handleAppError_1 = __importDefault(require("../../errors/handleAppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../auth/auth.model");
// Create employee with duplicate check
const createEmployeeOnDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if the user exists
    const isUserExists = yield auth_model_1.AuthModel.findById(payload === null || payload === void 0 ? void 0 : payload.userId);
    if (!isUserExists) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // Check if employee already exists with the same userId
    const isEmployeeExists = yield employee_model_1.EmployeeModel.findOne({
        userId: payload.userId,
        department: payload.department,
        position: payload.position,
    });
    if (isEmployeeExists) {
        throw new handleAppError_1.default(http_status_1.default.CONFLICT, "Employee with the same user, department and position already exists!");
    }
    const result = yield employee_model_1.EmployeeModel.create(payload);
    return result;
});
// Get all employees
const getAllEmployeesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeQuery = new QueryBuilder_1.default(employee_model_1.EmployeeModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield employeeQuery.modelQuery;
    return result;
});
// Get single employee
const getSingleEmployeeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.findById(id).populate("userId");
    if (!result) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "Employee not found!");
    }
    return result;
});
// Simple update employee
const updateEmployeeOnDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "Employee not found!");
    }
    return result;
});
// Delete employee
const deleteEmployeeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield employee_model_1.EmployeeModel.findByIdAndDelete(id);
    if (!result) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "Employee not found!");
    }
    return result;
});
exports.EmployeeServices = {
    createEmployeeOnDB,
    getAllEmployeesFromDB,
    getSingleEmployeeFromDB,
    updateEmployeeOnDB,
    deleteEmployeeFromDB,
};
