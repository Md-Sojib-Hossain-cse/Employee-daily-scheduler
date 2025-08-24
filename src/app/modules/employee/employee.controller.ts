import { EmployeeServices } from "./employee.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// Create employee
const createEmployee = catchAsync(async (req, res) => {
  const employeeInfo = req.body;
  const result = await EmployeeServices.createEmployeeOnDB(employeeInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee created successfully!",
    data: result,
  });
});

// Get all employees
const getAllEmployees = catchAsync(async (req, res) => {
  const result = await EmployeeServices.getAllEmployeesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employees retrieved successfully!",
    data: result,
  });
});

// Get single employee
const getSingleEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployeeServices.getSingleEmployeeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee retrieved successfully!",
    data: result,
  });
});

// Update employee
const updateEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const employeeInfo = req.body;
  const result = await EmployeeServices.updateEmployeeOnDB(id, employeeInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee updated successfully!",
    data: result,
  });
});

// Delete employee
const deleteEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployeeServices.deleteEmployeeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Employee deleted successfully!",
    data: result,
  });
});

export const EmployeeController = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
