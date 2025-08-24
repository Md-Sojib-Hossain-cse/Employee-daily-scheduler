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
exports.AnalyticsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleAppError_1 = __importDefault(require("../../errors/handleAppError"));
const shift_model_1 = require("../shift/shift.model");
const getCoverageFromDB = (day) => __awaiter(void 0, void 0, void 0, function* () {
    if (!day)
        throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, "Shift day is required!");
    return shift_model_1.ShiftModel.aggregate([
        { $match: { day } },
        {
            $unwind: { path: "$assignedEmployee", preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: { role: "$role", start: "$start", end: "$end" },
                totalAssigned: { $sum: { $cond: ["$assignedEmployee", 1, 0] } },
                location: { $first: "$location" },
                skillRequired: { $first: "$skillRequired" },
            },
        },
        { $sort: { "_id.role": 1, "_id.start": 1 } },
    ]);
});
const getWorkloadFromDB = (startDay, endDay) => __awaiter(void 0, void 0, void 0, function* () {
    if (!startDay || !endDay)
        throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, "Start and end day are required!");
    return shift_model_1.ShiftModel.aggregate([
        { $match: { day: { $gte: startDay, $lte: endDay } } },
        { $unwind: "$assignedEmployee" },
        {
            $project: {
                assignedEmployee: 1,
                durationHours: {
                    $divide: [
                        {
                            $subtract: [
                                {
                                    $toDate: {
                                        $concat: [
                                            { $dateToString: { format: "%Y-%m-%d", date: "$day" } },
                                            "T",
                                            "$end",
                                            ":00.000Z",
                                        ],
                                    },
                                },
                                {
                                    $toDate: {
                                        $concat: [
                                            { $dateToString: { format: "%Y-%m-%d", date: "$day" } },
                                            "T",
                                            "$start",
                                            ":00.000Z",
                                        ],
                                    },
                                },
                            ],
                        },
                        1000 * 60 * 60,
                    ],
                },
            },
        },
        {
            $group: {
                _id: "$assignedEmployee",
                totalHours: { $sum: "$durationHours" },
                shiftsCount: { $sum: 1 },
            },
        },
    ]);
});
const getConflictsFromDB = (day) => __awaiter(void 0, void 0, void 0, function* () {
    if (!day)
        throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, "Shift day is required!");
    return shift_model_1.ShiftModel.aggregate([
        { $match: { day } },
        { $unwind: "$assignedEmployee" },
        {
            $group: {
                _id: "$assignedEmployee",
                shifts: {
                    $push: {
                        start: "$start",
                        end: "$end",
                        shiftId: "$_id",
                        role: "$role",
                    },
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                shifts: 1,
                hasConflict: { $gt: ["$count", 1] },
            },
        },
        { $match: { hasConflict: true } },
    ]);
});
exports.AnalyticsService = {
    getCoverageFromDB,
    getWorkloadFromDB,
    getConflictsFromDB,
};
