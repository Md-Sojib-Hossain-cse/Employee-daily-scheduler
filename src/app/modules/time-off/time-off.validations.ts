import { z } from "zod";

// TimeOff request validation
const createTimeOffValidationSchema = z.object({
  employee: z.string({
    error: () => "Employee ID is required!",
  }),
  start: z.string({
    error: () => "Start date is required!",
  }),
  end: z.string({
    error: () => "End date is required!",
  }),
  status: z
    .enum(["pending", "approved", "rejected"])
    .optional()
    .default("pending"),
  reason: z.string({
    error: () => "Reason for time off is required!",
  }),
});

const updateTimeOffValidationSchema = z.object({
  start: z.string().optional(),
  end: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  reason: z.string().optional(),
});

export const TimeOffValidations = {
  createTimeOffValidationSchema,
  updateTimeOffValidationSchema,
};
