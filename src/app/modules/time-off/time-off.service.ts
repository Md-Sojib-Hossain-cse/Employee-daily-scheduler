import AppError from "../../errors/handleAppError";
import httpStatus from "http-status";
import { TimeOffRequest } from "./time-off.model";
import { TTimeOff } from "./time-off.interface";

// Submit a time-off request
const submitTimeOffRequest = async (payload: TTimeOff) => {
  const result = await TimeOffRequest.create(payload);
  return result;
};

// Approve or reject a time-off request (admin)
const updateTimeOffStatus = async (
  id: string,
  status: "approved" | "rejected"
) => {
  const request = await TimeOffRequest.findByIdAndUpdate(
    id,
    {
      status: status,
    },
    { new: true }
  );
  if (!request) {
    throw new AppError(httpStatus.NOT_FOUND, "Time-off request not found!");
  }

  return request;
};

// Get all time-off requests
const getAllTimeOffRequests = async () => {
  const requests = await TimeOffRequest.find()
    .populate("employee", "name department position")
    .sort({ createdAt: -1 });
  return requests;
};

export const TimeOffServices = {
  submitTimeOffRequest,
  updateTimeOffStatus,
  getAllTimeOffRequests,
};
