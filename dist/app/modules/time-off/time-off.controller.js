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
exports.TimeOffController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const time_off_service_1 = require("./time-off.service");
// Submit a time-off request
const submitTimeOff = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestInfo = req.body;
    const result = yield time_off_service_1.TimeOffServices.submitTimeOffRequest(requestInfo);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Time-off request submitted successfully!",
        data: result,
    });
}));
// Approve or reject a time-off request (admin)
const approveOrRejectTimeOff = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.params.id;
    const { status } = req.body; // expects "approved" or "rejected"
    const result = yield time_off_service_1.TimeOffServices.updateTimeOffStatus(requestId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Time-off request ${status} successfully!`,
        data: result,
    });
}));
// Get all time-off requests
const getAllTimeOff = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield time_off_service_1.TimeOffServices.getAllTimeOffRequests();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All time-off requests retrieved successfully!",
        data: result,
    });
}));
exports.TimeOffController = {
    submitTimeOff,
    approveOrRejectTimeOff,
    getAllTimeOff,
};
