import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { TimeOffServices } from "./time-off.service";

// Submit a time-off request
const submitTimeOff = catchAsync(async (req, res) => {
  const requestInfo = req.body;
  const result = await TimeOffServices.submitTimeOffRequest(requestInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Time-off request submitted successfully!",
    data: result,
  });
});

// Approve or reject a time-off request (admin)
const approveOrRejectTimeOff = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body; // expects "approved" or "rejected"

  const result = await TimeOffServices.updateTimeOffStatus(requestId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Time-off request ${status} successfully!`,
    data: result,
  });
});

// Get all time-off requests
const getAllTimeOff = catchAsync(async (req, res) => {
  const result = await TimeOffServices.getAllTimeOffRequests();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All time-off requests retrieved successfully!",
    data: result,
  });
});

export const TimeOffController = {
  submitTimeOff,
  approveOrRejectTimeOff,
  getAllTimeOff,
};
