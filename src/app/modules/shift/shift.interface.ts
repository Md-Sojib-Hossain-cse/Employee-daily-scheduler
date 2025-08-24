import { Types } from "mongoose";

export type TShift = {
  day: Date;
  start: string;
  end: string;
  role: string;
  skillRequired: string[];
  location: string;
  assignedEmployee: Types.ObjectId[];
  recurringPatterns: "daily" | "weekly" | "monthly";
};
