import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/handleAppError";
import config from "../config";
import { TUserRole } from "../modules/auth/auth.interface";
import { AuthModel } from "../modules/auth/auth.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.cookie?.split("=")[1] || "";

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    let decoded = {} as JwtPayload;
    try {
      decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(401, "Unauthorized !");
    }
    const role = decoded.role;

    const user = await AuthModel.findOne({ email: decoded?.email });

    if (!user) {
      throw new AppError(404, "The user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
