"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffValidations = void 0;
const zod_1 = require("zod");
// TimeOff request validation
const createTimeOffValidationSchema = zod_1.z.object({
    employee: zod_1.z.string({
        error: () => "Employee ID is required!",
    }),
    start: zod_1.z.string({
        error: () => "Start date is required!",
    }),
    end: zod_1.z.string({
        error: () => "End date is required!",
    }),
    status: zod_1.z
        .enum(["pending", "approved", "rejected"])
        .optional()
        .default("pending"),
    reason: zod_1.z.string({
        error: () => "Reason for time off is required!",
    }),
});
const updateTimeOffValidationSchema = zod_1.z.object({
    start: zod_1.z.string().optional(),
    end: zod_1.z.string().optional(),
    status: zod_1.z.enum(["pending", "approved", "rejected"]).optional(),
    reason: zod_1.z.string().optional(),
});
exports.TimeOffValidations = {
    createTimeOffValidationSchema,
    updateTimeOffValidationSchema,
};
