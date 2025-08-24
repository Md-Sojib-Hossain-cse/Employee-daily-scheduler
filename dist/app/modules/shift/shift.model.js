"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftModel = void 0;
const mongoose_1 = require("mongoose");
const shiftSchema = new mongoose_1.Schema({
    day: {
        type: Date,
        required: [true, "Shift day is required!"],
    },
    start: {
        type: String,
        required: [true, "Shift start time is required!"],
    },
    end: {
        type: String,
        required: [true, "Shift end time is required!"],
    },
    role: {
        type: String,
        required: [true, "Role is required for the shift!"],
    },
    skillRequired: {
        type: [String],
        required: [true, "At least one skill is required for the shift!"],
    },
    location: {
        type: String,
        required: [true, "Shift location is required!"],
    },
    assignedEmployee: {
        type: [mongoose_1.Types.ObjectId],
        ref: "employee",
        default: [],
    },
    recurringPatterns: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "daily",
    },
}, {
    timestamps: true,
});
exports.ShiftModel = (0, mongoose_1.model)("shift", shiftSchema);
