import { Schema, model } from "mongoose";
import { TTimeOff } from "./time-off.interface";

const timeOffSchema = new Schema<TTimeOff>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

export const TimeOffRequest = model<TTimeOff>("timeOffRequest", timeOffSchema);
