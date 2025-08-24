export type TAuth = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "hr" | "employee";
  isActive: Boolean;
};
