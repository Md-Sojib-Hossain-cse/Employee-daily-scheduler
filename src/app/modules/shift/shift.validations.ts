import { z } from "zod";

// Shift validation
const createShiftValidationSchema = z.object({
  day: z.string({
    error: () => "Shift day is required!",
  }),
  start: z.string({
    error: () => "Shift start time is required!",
  }),
  end: z.string({
    error: () => "Shift end time is required!",
  }),
  role: z.string({
    error: () => "Role is required for the shift!",
  }),
  skillRequired: z
    .array(
      z.string({
        error: () => "Each skill must be a string!",
      }),
      {
        error: () => "Skills are required!",
      }
    )
    .nonempty({ message: "At least one skill is required for the shift!" }),
  location: z.string({
    error: () => "Shift location is required!",
  }),
  assignedEmployee: z
    .array(
      z.string({
        error: () => "Each assigned employee must be a valid ID!",
      })
    )
    .optional()
    .default([]),
  recurringPatterns: z.enum(["daily", "weekly", "monthly"], {
    message: "Recurring pattern must be daily, weekly, or monthly!",
  }),
});

// Shift update validation (all fields optional)
const updateShiftValidationSchema = z.object({
  day: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  role: z.string().optional(),
  skillRequired: z.array(z.string()).optional(),
  location: z.string().optional(),
  assignedEmployee: z.array(z.string()).optional(),
  recurringPatterns: z.enum(["daily", "weekly", "monthly"]).optional(),
});

export const ShiftValidations = {
  createShiftValidationSchema,
  updateShiftValidationSchema,
};
