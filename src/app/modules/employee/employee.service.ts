import QueryBuilder from "../../builder/QueryBuilder";
import { EmployeeModel } from "./employee.model";
import { TEmployee } from "./employee.interface";
import AppError from "../../errors/handleAppError";
import httpStatus from "http-status";
import { AuthModel } from "../auth/auth.model";

// Create employee with duplicate check
const createEmployeeOnDB = async (payload: TEmployee) => {
  //check if the user exists
  const isUserExists = await AuthModel.findById(payload?.userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  // Check if employee already exists with the same userId
  const isEmployeeExists = await EmployeeModel.findOne({
    userId: payload.userId,
    department: payload.department,
    position: payload.position,
  });

  if (isEmployeeExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Employee with the same user, department and position already exists!"
    );
  }

  const result = await EmployeeModel.create(payload);
  return result;
};

// Get all employees
const getAllEmployeesFromDB = async (query: Record<string, unknown>) => {
  const employeeQuery = new QueryBuilder(EmployeeModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await employeeQuery.modelQuery;
  return result;
};

// Get single employee
const getSingleEmployeeFromDB = async (id: string) => {
  const result = await EmployeeModel.findById(id).populate("userId");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Employee not found!");
  }
  return result;
};

// Simple update employee
const updateEmployeeOnDB = async (id: string, payload: Partial<TEmployee>) => {
  const result = await EmployeeModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Employee not found!");
  }

  return result;
};

// Delete employee
const deleteEmployeeFromDB = async (id: string) => {
  const result = await EmployeeModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Employee not found!");
  }
  return result;
};

export const EmployeeServices = {
  createEmployeeOnDB,
  getAllEmployeesFromDB,
  getSingleEmployeeFromDB,
  updateEmployeeOnDB,
  deleteEmployeeFromDB,
};
