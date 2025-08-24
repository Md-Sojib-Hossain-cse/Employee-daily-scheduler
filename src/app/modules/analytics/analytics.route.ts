import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/coverage", auth("admin"), AnalyticsController.getCoverage);

router.get("/workload", auth("admin"), AnalyticsController.getWorkload);

router.get("/conflicts", auth("admin"), AnalyticsController.getConflicts);

export const AnalyticsRoutes = router;
