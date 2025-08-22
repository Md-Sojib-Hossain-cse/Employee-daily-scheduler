import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { shopServices } from "./shop.service";

const getAllShop = catchAsync(async (req, res) => {
  const result = await shopServices.getAllShopsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Shops retrieve successfully!",
    data: result,
  });
});

const getSingleShop = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await shopServices.getSingleShopFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Shop retrieve successfully!",
    data: result,
  });
});

const createShop = catchAsync(async (req, res) => {
  const shopData = req.body;
  const result = await shopServices.createShopIntoDB(shopData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Shop created successfully!",
    data: result,
  });
});

export const shopControllers = {
  getAllShop,
  getSingleShop,
  createShop,
};
