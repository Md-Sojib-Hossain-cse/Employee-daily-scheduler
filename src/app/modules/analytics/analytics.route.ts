import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";

const router = Router();

router.get("/coverage", AnalyticsController.getCoverage);

router.get("/workload", AnalyticsController.getWorkload);

router.get("/conflicts", AnalyticsController.getConflicts);

export const AnalyticsRoutes = router;
