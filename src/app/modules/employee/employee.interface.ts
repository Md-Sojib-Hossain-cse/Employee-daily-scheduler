import { Types } from "mongoose";

export type TAvailability = {
  dayOfWeek: number;
  start: string;
  end: string;
};

export type TEmployee = {
  userId: Types.ObjectId;
  department: string;
  position: string;
  skills: string[];
  location: string;
  availability: TAvailability[];
  hireDate: Date;
  employmentType: "full-time" | "part-time";
};
