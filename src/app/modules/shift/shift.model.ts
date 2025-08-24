import { model, Schema, Types } from "mongoose";
import { TShift } from "./shift.interface";

const shiftSchema = new Schema<TShift>(
  {
    day: {
      type: Date,
      required: [true, "Shift day is required!"],
    },
    start: {
      type: String,
      required: [true, "Shift start time is required!"],
    },
    end: {
      type: String,
      required: [true, "Shift end time is required!"],
    },
    role: {
      type: String,
      required: [true, "Role is required for the shift!"],
    },
    skillRequired: {
      type: [String],
      required: [true, "At least one skill is required for the shift!"],
    },
    location: {
      type: String,
      required: [true, "Shift location is required!"],
    },
    assignedEmployee: {
      type: [Types.ObjectId],
      ref: "employee",
      default: [],
    },
    recurringPatterns: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },
  },
  {
    timestamps: true,
  }
);

export const ShiftModel = model<TShift>("shift", shiftSchema);
