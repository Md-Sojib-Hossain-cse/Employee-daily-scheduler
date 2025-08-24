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
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Get coverage per role per hour
const getCoverage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const day = req.query.day ? new Date(req.query.day) : null;
    if (!day)
        throw new Error("Query parameter 'day' is required!");
    const result = yield analytics_service_1.AnalyticsService.getCoverageFromDB(day);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Shift coverage retrieved successfully!",
        data: result,
    });
}));
// Get workload per employee for a date range
const getWorkload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startDay = req.query.startDay
        ? new Date(req.query.startDay)
        : null;
    const endDay = req.query.endDay ? new Date(req.query.endDay) : null;
    if (!startDay || !endDay)
        throw new Error("Query parameters 'startDay' and 'endDay' are required!");
    const result = yield analytics_service_1.AnalyticsService.getWorkloadFromDB(startDay, endDay);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Employee workload retrieved successfully!",
        data: result,
    });
}));
// Get shift conflicts (double-booking) for a day
const getConflicts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const day = req.query.day ? new Date(req.query.day) : null;
    if (!day)
        throw new Error("Query parameter 'day' is required!");
    const result = yield analytics_service_1.AnalyticsService.getConflictsFromDB(day);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Shift conflicts retrieved successfully!",
        data: result,
    });
}));
exports.AnalyticsController = {
    getCoverage,
    getWorkload,
    getConflicts,
};
