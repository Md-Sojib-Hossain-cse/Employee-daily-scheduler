import { AnalyticsService } from "./analytics.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// Get coverage per role per hour
const getCoverage = catchAsync(async (req, res) => {
  const day = req.query.day ? new Date(req.query.day as string) : null;
  if (!day) throw new Error("Query parameter 'day' is required!");

  const result = await AnalyticsService.getCoverageFromDB(day);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift coverage retrieved successfully!",
    data: result,
  });
});

// Get workload per employee for a date range
const getWorkload = catchAsync(async (req, res) => {
  const startDay = req.query.startDay
    ? new Date(req.query.startDay as string)
    : null;
  const endDay = req.query.endDay ? new Date(req.query.endDay as string) : null;
  if (!startDay || !endDay)
    throw new Error("Query parameters 'startDay' and 'endDay' are required!");

  const result = await AnalyticsService.getWorkloadFromDB(startDay, endDay);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee workload retrieved successfully!",
    data: result,
  });
});

// Get shift conflicts (double-booking) for a day
const getConflicts = catchAsync(async (req, res) => {
  const day = req.query.day ? new Date(req.query.day as string) : null;
  if (!day) throw new Error("Query parameter 'day' is required!");

  const result = await AnalyticsService.getConflictsFromDB(day);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift conflicts retrieved successfully!",
    data: result,
  });
});

export const AnalyticsController = {
  getCoverage,
  getWorkload,
  getConflicts,
};
