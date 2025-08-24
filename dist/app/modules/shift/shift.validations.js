"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftValidations = void 0;
const zod_1 = require("zod");
// Shift validation
const createShiftValidationSchema = zod_1.z.object({
    day: zod_1.z.string({
        error: () => "Shift day is required!",
    }),
    start: zod_1.z.string({
        error: () => "Shift start time is required!",
    }),
    end: zod_1.z.string({
        error: () => "Shift end time is required!",
    }),
    role: zod_1.z.string({
        error: () => "Role is required for the shift!",
    }),
    skillRequired: zod_1.z
        .array(zod_1.z.string({
        error: () => "Each skill must be a string!",
    }), {
        error: () => "Skills are required!",
    })
        .nonempty({ message: "At least one skill is required for the shift!" }),
    location: zod_1.z.string({
        error: () => "Shift location is required!",
    }),
    assignedEmployee: zod_1.z
        .array(zod_1.z.string({
        error: () => "Each assigned employee must be a valid ID!",
    }))
        .optional()
        .default([]),
    recurringPatterns: zod_1.z.enum(["daily", "weekly", "monthly"], {
        message: "Recurring pattern must be daily, weekly, or monthly!",
    }),
});
exports.ShiftValidations = {
    createShiftValidationSchema,
};
