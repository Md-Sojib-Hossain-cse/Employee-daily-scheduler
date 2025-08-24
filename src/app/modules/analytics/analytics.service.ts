import httpStatus from "http-status";
import AppError from "../../errors/handleAppError";
import { ShiftModel } from "../shift/shift.model";

const getCoverageFromDB = async (day: Date) => {
  if (!day)
    throw new AppError(httpStatus.BAD_REQUEST, "Shift day is required!");

  return ShiftModel.aggregate([
    { $match: { day } },
    {
      $unwind: { path: "$assignedEmployee", preserveNullAndEmptyArrays: true },
    },
    {
      $group: {
        _id: { role: "$role", start: "$start", end: "$end" },
        totalAssigned: { $sum: { $cond: ["$assignedEmployee", 1, 0] } },
        location: { $first: "$location" },
        skillRequired: { $first: "$skillRequired" },
      },
    },
    { $sort: { "_id.role": 1, "_id.start": 1 } },
  ]);
};

const getWorkloadFromDB = async (startDay: Date, endDay: Date) => {
  if (!startDay || !endDay)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Start and end day are required!"
    );

  return ShiftModel.aggregate([
    { $match: { day: { $gte: startDay, $lte: endDay } } },
    { $unwind: "$assignedEmployee" },
    {
      $project: {
        assignedEmployee: 1,
        durationHours: {
          $divide: [
            {
              $subtract: [
                {
                  $toDate: {
                    $concat: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$day" } },
                      "T",
                      "$end",
                      ":00.000Z",
                    ],
                  },
                },
                {
                  $toDate: {
                    $concat: [
                      { $dateToString: { format: "%Y-%m-%d", date: "$day" } },
                      "T",
                      "$start",
                      ":00.000Z",
                    ],
                  },
                },
              ],
            },
            1000 * 60 * 60,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$assignedEmployee",
        totalHours: { $sum: "$durationHours" },
        shiftsCount: { $sum: 1 },
      },
    },
  ]);
};

const getConflictsFromDB = async (day: Date) => {
  if (!day)
    throw new AppError(httpStatus.BAD_REQUEST, "Shift day is required!");

  return ShiftModel.aggregate([
    { $match: { day } },
    { $unwind: "$assignedEmployee" },
    {
      $group: {
        _id: "$assignedEmployee",
        shifts: {
          $push: {
            start: "$start",
            end: "$end",
            shiftId: "$_id",
            role: "$role",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        shifts: 1,
        hasConflict: { $gt: ["$count", 1] },
      },
    },
    { $match: { hasConflict: true } },
  ]);
};

export const AnalyticsService = {
  getCoverageFromDB,
  getWorkloadFromDB,
  getConflictsFromDB,
};
