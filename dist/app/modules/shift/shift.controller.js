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
exports.ShiftController = void 0;
const shift_service_1 = require("./shift.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Create a new shift
const createShift = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shiftInfo = req.body;
    const result = yield shift_service_1.ShiftServices.createShiftOnDB(shiftInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Shift created successfully!",
        data: result,
    });
}));
// Get all shifts
const getAllShifts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield shift_service_1.ShiftServices.getAllShiftsFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All shifts retrieved successfully!",
        data: result,
    });
}));
// Get a single shift by ID
const getSingleShift = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shiftId = req.params.id;
    const result = yield shift_service_1.ShiftServices.getSingleShiftFromDB(shiftId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Shift retrieved successfully!",
        data: result,
    });
}));
//assign employee to shift
const assignEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shiftId = req.params.id;
    const { employeeId } = req.body;
    const result = yield shift_service_1.ShiftServices.assignEmployeeToShift(shiftId, employeeId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Employee assigned successfully to shift!",
        data: result,
    });
}));
// Delete a shift by ID
const deleteShift = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shiftId = req.params.id;
    const result = yield shift_service_1.ShiftServices.deleteShiftFromDB(shiftId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Shift deleted successfully!",
        data: result,
    });
}));
exports.ShiftController = {
    createShift,
    getAllShifts,
    getSingleShift,
    assignEmployee,
    deleteShift,
};
