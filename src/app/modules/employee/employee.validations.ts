import { z } from "zod";

// availability validation
const availabilityValidationSchema = z.object({
  dayOfWeek: z
    .number({
      error: () => "Day of week is required!",
    })
    .min(0, { message: "Day of week must be between 0-6" })
    .max(6, { message: "Day of week must be between 0-6" }),
  start: z.string({
    error: () => "Start time is required!",
  }),
  end: z.string({
    error: () => "End time is required!",
  }),
});

// employee validation
const createEmployeeValidationSchema = z.object({
  userId: z.string({
    error: () => "UserId is required!",
  }),
  department: z.string({
    error: () => "Department is required!",
  }),
  position: z.string({
    error: () => "Position is required!",
  }),
  skills: z
    .array(
      z.string({
        error: () => "Each skill must be a string!",
      }),
      {
        error: () => "Skills are required!",
      }
    )
    .nonempty({ message: "At least one skill is required!" }),
  location: z.string({
    error: () => "Location is required!",
  }),
  availability: z
    .array(availabilityValidationSchema, {
      error: () => "Availability is required!",
    })
    .nonempty({ message: "At least one availability entry is required!" }),
  hireDate: z.string({
    error: () => "Hire date is required!",
  }),
  employmentType: z.enum(["full-time", "part-time"], {
    message: "Employment type must be either 'full-time' or 'part-time'",
  }),
});

const updateEmployeeValidationSchema = z.object({
  userId: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
  availability: z.array(availabilityValidationSchema).optional(),
  hireDate: z.string().optional(),
  employmentType: z.enum(["full-time", "part-time"]).optional(),
});

export const EmployeeValidations = {
  createEmployeeValidationSchema,
  updateEmployeeValidationSchema,
};
