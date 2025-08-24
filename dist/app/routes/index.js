"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const employee_route_1 = require("../modules/employee/employee.route");
const shift_route_1 = require("../modules/shift/shift.route");
const time_off_routes_1 = require("../modules/time-off/time-off.routes");
const analytics_route_1 = require("../modules/analytics/analytics.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/employee",
        route: employee_route_1.EmployeeRoutes,
    },
    {
        path: "/shift",
        route: shift_route_1.ShiftRoutes,
    },
    {
        path: "/time-off",
        route: time_off_routes_1.TimeOffRoutes,
    },
    {
        path: "/analytics",
        route: analytics_route_1.AnalyticsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
