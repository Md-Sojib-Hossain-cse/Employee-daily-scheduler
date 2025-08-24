"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
// auth validation
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        error: () => "Name is required to create a User!",
    }),
    email: zod_1.z
        .string({
        error: () => "Email is required to create a User!",
    })
        .email("Invalid email format"),
    password: zod_1.z.string({
        error: () => "Password is required to create a User!",
    }),
    role: zod_1.z
        .string({
        error: () => "Role is required to create a User!",
    })
        .optional(),
    isActive: zod_1.z.boolean().default(false),
});
const loginUserValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        error: () => "Email is required to create a User!",
    })
        .email("Invalid email format"),
    password: zod_1.z.string({
        error: () => "Password is required to create a User!",
    }),
});
exports.AuthValidations = {
    createUserValidationSchema,
    loginUserValidationSchema,
};
