import { Types } from "mongoose";

export type TTimeOff = {
  employee: Types.ObjectId;
  start: Date;
  end: Date;
  status: "pending" | "approved" | "rejected";
  reason: string;
};
