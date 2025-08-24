import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { EmployeeRoutes } from "../modules/employee/employee.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/employee",
    route: EmployeeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
