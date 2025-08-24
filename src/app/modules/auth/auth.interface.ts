export type TUserRole = "admin" | "hr" | "employee";

export type TAuth = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isActive: Boolean;
};
