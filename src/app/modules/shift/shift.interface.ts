import { Types } from "mongoose";

type TSkillRequired = { type: string };

export type TShift = {
  day: Date;
  start: string;
  end: string;
  role: string;
  skillRequired: TSkillRequired[];
  location: string;
  assignedEmployee: Types.ObjectId;
  recurringPatterns: "daily" | "weekly" | "monthly";
};
