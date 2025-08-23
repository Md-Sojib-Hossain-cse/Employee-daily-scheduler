export type TAvailability = {
  dayOfWeek: number;
  start: string;
  end: string;
};

export type TEmployee = {
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
  location: string;
  availability: TAvailability[];
  employmentType: "full-time" | "part-time";
};
