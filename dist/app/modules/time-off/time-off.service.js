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
exports.TimeOffServices = void 0;
const handleAppError_1 = __importDefault(require("../../errors/handleAppError"));
const http_status_1 = __importDefault(require("http-status"));
const time_off_model_1 = require("./time-off.model");
// Submit a time-off request
const submitTimeOffRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield time_off_model_1.TimeOffRequest.create(payload);
    return result;
});
// Approve or reject a time-off request (admin)
const updateTimeOffStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield time_off_model_1.TimeOffRequest.findByIdAndUpdate(id, {
        status: status,
    }, { new: true });
    if (!request) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "Time-off request not found!");
    }
    return request;
});
// Get all time-off requests
const getAllTimeOffRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield time_off_model_1.TimeOffRequest.find()
        .populate("employee", "name department position")
        .sort({ createdAt: -1 });
    return requests;
});
exports.TimeOffServices = {
    submitTimeOffRequest,
    updateTimeOffStatus,
    getAllTimeOffRequests,
};
