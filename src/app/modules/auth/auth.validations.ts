import { z } from "zod";

// auth validation
const createUserValidationSchema = z.object({
  name: z.string({
    error: () => "Name is required to create a User!",
  }),
  email: z
    .string({
      error: () => "Email is required to create a User!",
    })
    .email("Invalid email format"),
  password: z.string({
    error: () => "Password is required to create a User!",
  }),
  role: z.string({
    error: () => "Role is required to create a User!",
  }),
  isActive: z.boolean().default(false),
});

const loginUserValidationSchema = z.object({
  email: z
    .string({
      error: () => "Email is required to create a User!",
    })
    .email("Invalid email format"),
  password: z.string({
    error: () => "Password is required to create a User!",
  }),
});

export const AuthValidations = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
