"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const mongoose_1 = require("mongoose");
// Sub-schema for availability
const availabilitySchema = new mongoose_1.Schema({
    dayOfWeek: {
        type: Number,
        required: [true, "Day of week is required!"], // 0 = Sunday, 6 = Saturday
        min: 0,
        max: 6,
    },
    start: {
        type: String,
        required: [true, "Start time is required!"], // e.g., "09:00"
    },
    end: {
        type: String,
        required: [true, "End time is required!"], // e.g., "17:00"
    },
}, { _id: false });
// Main Employee schema
const employeeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "UserId is required!"],
    },
    department: {
        type: String,
        required: [true, "Department is required!"],
    },
    position: {
        type: String,
        required: [true, "Position is required!"],
    },
    skills: {
        type: [String],
        required: [true, "Skills are required!"],
        default: [],
    },
    location: {
        type: String,
        required: [true, "Location is required!"],
    },
    availability: {
        type: [availabilitySchema],
        required: [true, "Availability is required!"],
    },
    hireDate: {
        type: Date,
        required: [true, "Hire date is required!"],
    },
    employmentType: {
        type: String,
        enum: ["full-time", "part-time"],
        required: [true, "Employment type is required!"],
    },
}, {
    timestamps: true,
});
exports.EmployeeModel = (0, mongoose_1.model)("employee", employeeSchema);
