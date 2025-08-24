"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidations = void 0;
const zod_1 = require("zod");
// availability validation
const availabilityValidationSchema = zod_1.z.object({
    dayOfWeek: zod_1.z
        .number({
        error: () => "Day of week is required!",
    })
        .min(0, { message: "Day of week must be between 0-6" })
        .max(6, { message: "Day of week must be between 0-6" }),
    start: zod_1.z.string({
        error: () => "Start time is required!",
    }),
    end: zod_1.z.string({
        error: () => "End time is required!",
    }),
});
// employee validation
const createEmployeeValidationSchema = zod_1.z.object({
    userId: zod_1.z.string({
        error: () => "UserId is required!",
    }),
    department: zod_1.z.string({
        error: () => "Department is required!",
    }),
    position: zod_1.z.string({
        error: () => "Position is required!",
    }),
    skills: zod_1.z
        .array(zod_1.z.string({
        error: () => "Each skill must be a string!",
    }), {
        error: () => "Skills are required!",
    })
        .nonempty({ message: "At least one skill is required!" }),
    location: zod_1.z.string({
        error: () => "Location is required!",
    }),
    availability: zod_1.z
        .array(availabilityValidationSchema, {
        error: () => "Availability is required!",
    })
        .nonempty({ message: "At least one availability entry is required!" }),
    hireDate: zod_1.z.string({
        error: () => "Hire date is required!",
    }),
    employmentType: zod_1.z.enum(["full-time", "part-time"], {
        message: "Employment type must be either 'full-time' or 'part-time'",
    }),
});
const updateEmployeeValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    position: zod_1.z.string().optional(),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    location: zod_1.z.string().optional(),
    availability: zod_1.z.array(availabilityValidationSchema).optional(),
    hireDate: zod_1.z.string().optional(),
    employmentType: zod_1.z.enum(["full-time", "part-time"]).optional(),
});
exports.EmployeeValidations = {
    createEmployeeValidationSchema,
    updateEmployeeValidationSchema,
};
