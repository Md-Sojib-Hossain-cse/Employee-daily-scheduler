import { Schema, model } from "mongoose";
import { TAvailability, TEmployee } from "./employee.interface";

// Sub-schema for availability
const availabilitySchema = new Schema<TAvailability>(
  {
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
  },
  { _id: false }
);

// Main Employee schema
const employeeSchema = new Schema<TEmployee>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

export const EmployeeModel = model<TEmployee>("employee", employeeSchema);
