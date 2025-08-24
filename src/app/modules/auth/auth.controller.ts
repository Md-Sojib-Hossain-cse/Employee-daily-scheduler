import { AuthServices } from "./auth.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

// Register User
const createUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await AuthServices.createUserOnDB(userInfo);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User has been registered successfully!",
    data: result,
  });
});

// Login User
const loginUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await AuthServices.loginUserFromDB(userInfo);

  sendResponse(
    res.cookie("accessToken", result?.accessToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }),
    {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully!",
      data: result?.user,
    }
  );
});

// Logout User
const logoutUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await AuthServices.logoutUserFromDB(userId);

  sendResponse(
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "none",
      maxAge: 0,
    }),
    {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged out successfully!",
      data: result,
    }
  );
});

export const AuthController = {
  createUser,
  loginUser,
  logoutUser,
};
