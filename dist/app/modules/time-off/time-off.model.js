"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffRequest = void 0;
const mongoose_1 = require("mongoose");
const timeOffSchema = new mongoose_1.Schema({
    employee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    reason: { type: String, required: true },
}, { timestamps: true });
exports.TimeOffRequest = (0, mongoose_1.model)("timeOffRequest", timeOffSchema);
