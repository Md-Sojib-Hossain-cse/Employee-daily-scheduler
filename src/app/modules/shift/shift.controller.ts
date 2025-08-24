import { ShiftServices } from "./shift.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// Create a new shift
const createShift = catchAsync(async (req, res) => {
  const shiftInfo = req.body;
  const result = await ShiftServices.createShiftOnDB(shiftInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Shift created successfully!",
    data: result,
  });
});

// Get all shifts
const getAllShifts = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ShiftServices.getAllShiftsFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All shifts retrieved successfully!",
    data: result,
  });
});

// Get a single shift by ID
const getSingleShift = catchAsync(async (req, res) => {
  const shiftId = req.params.id;
  const result = await ShiftServices.getSingleShiftFromDB(shiftId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift retrieved successfully!",
    data: result,
  });
});

//assign employee to shift
const assignEmployee = catchAsync(async (req, res) => {
  const shiftId = req.params.id;
  const { employeeId } = req.body; 

  const result = await ShiftServices.assignEmployeeToShift(shiftId, employeeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee assigned successfully to shift!",
    data: result,
  });
});

// Delete a shift by ID
const deleteShift = catchAsync(async (req, res) => {
  const shiftId = req.params.id;
  const result = await ShiftServices.deleteShiftFromDB(shiftId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shift deleted successfully!",
    data: result,
  });
});

export const ShiftController = {
  createShift,
  getAllShifts,
  getSingleShift,
  assignEmployee,
  deleteShift,
};
