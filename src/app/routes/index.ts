import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { EmployeeRoutes } from "../modules/employee/employee.route";
import { ShiftRoutes } from "../modules/shift/shift.route";
import { TimeOffRoutes } from "../modules/time-off/time-off.routes";
import { AnalyticsRoutes } from "../modules/analytics/analytics.route";

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
  {
    path: "/shift",
    route: ShiftRoutes,
  },
  {
    path: "/time-off",
    route: TimeOffRoutes,
  },
  {
    path: "/analytics",
    route: AnalyticsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
