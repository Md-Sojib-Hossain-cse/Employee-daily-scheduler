export type TDays =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type TRecurringTemplate = {
  role: string;
  skillRequired: string[];
  location: string;
  days: TDays;
  start: string;
  end: string;
};
