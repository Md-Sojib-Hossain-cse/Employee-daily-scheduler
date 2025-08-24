import config from "../../config";
import { AuthModel } from "./auth.model";
import { TAuth } from "./auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../../errors/handleAppError";
import httpStatus from "http-status";

// Register a new user
const createUserOnDB = async (payload: TAuth) => {
  const isUserExists = await AuthModel.findOne({ email: payload?.email });

  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exist!");
  }

  const result = await AuthModel.create(payload);
  return result;
};

// Login user
const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const isUserExists = await AuthModel.findOne({ email: payload?.email });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
  }

  // Compare hashed password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong credentials!");
  }

  // Update active status
  const user = await AuthModel.findByIdAndUpdate(
    isUserExists?._id,
    { isActive: true },
    { new: true }
  );

  //removing password from payload
  if (user) {
    user.password = "";
  }

  // JWT payload
  const jwtPayload = {
    email: isUserExists?.email,
    role: isUserExists?.role,
  };

  // Access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "24h",
  });

  return {
    user,
    accessToken,
  };
};

// Logout user
const logoutUserFromDB = async (id: string) => {
  await AuthModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
  return {};
};

export const AuthServices = {
  createUserOnDB,
  loginUserFromDB,
  logoutUserFromDB,
};
