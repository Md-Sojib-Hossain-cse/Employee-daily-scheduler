export type TAuth = {
  name: string;
  email: string;
  password: string;
  role: string; // we can use enum type if we know which roles are applicable
  isActive: Boolean;
};
