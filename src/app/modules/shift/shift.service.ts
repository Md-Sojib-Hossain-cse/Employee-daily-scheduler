import QueryBuilder from "../../builder/QueryBuilder";
import { ShiftModel } from "./shift.model";
import { TShift } from "./shift.interface";
import AppError from "../../errors/handleAppError";
import httpStatus from "http-status";
import { Types } from "mongoose";

// Create a new shift
const createShiftOnDB = async (payload: TShift) => {
  const result = await ShiftModel.create(payload);
  return result;
};

// Get all shifts with query builder (filter, sort, paginate, fields)
const getAllShiftsFromDB = async (query: Record<string, unknown>) => {
  const shiftQuery = new QueryBuilder(ShiftModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await shiftQuery.modelQuery;
  return result;
};

// Get a single shift by ID
const getSingleShiftFromDB = async (id: string) => {
  const result = await ShiftModel.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found!");
  }
  return result;
};

// Assign employees to a shift
const assignEmployeeToShift = async (
  shiftId: string,
  employeeId: Types.ObjectId
) => {
  const shift = await ShiftModel.findById(shiftId);
  if (!shift) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found!");
  }

  // Prevent duplicate assignment
  if (shift.assignedEmployee.includes(employeeId)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Employee is already assigned to this shift!"
    );
  }

  shift.assignedEmployee.push(employeeId);
  await shift.save();

  return shift;
};

// Delete a shift by ID
const deleteShiftFromDB = async (id: string) => {
  const result = await ShiftModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Shift not found!");
  }
  return result;
};



export const ShiftServices = {
  createShiftOnDB,
  getAllShiftsFromDB,
  getSingleShiftFromDB,
  assignEmployeeToShift,
  deleteShiftFromDB,
};
