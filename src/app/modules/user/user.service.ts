import AppError from "../../errors/handleAppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";

const getAllUserFromDB = async () => {
  const result = await UserModel.find();

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);

  //if no user found with the id
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
  }

  return result;
};

const updateUserOnDB = async (
  id: string,
  payload: Partial<TUser> & Pick<TUser, "email">
) => {
  const isUserExists = await UserModel.findById(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not Exists!");
  }

  if (isUserExists?.email !== payload?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized User!");
  }

  if (payload?.password) {
    payload.password = await bcrypt.hash(
      payload?.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const { email, ...updateData } = payload;

  const result = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return result;
};

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserOnDB,
};
