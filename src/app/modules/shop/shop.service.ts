import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/handleAppError";
import httpStatus from "http-status";
import { ShopModel } from "./shop.model";
import { ShopSearchableFields } from "./shop.const";
import { TShop } from "./shop.interface";

const getAllShopsFromDB = async (query: Record<string, unknown>) => {
  const shopQuery = new QueryBuilder(ShopModel.find(), query)
    .search(ShopSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await shopQuery.modelQuery;

  return result;
};

const getSingleShopFromDB = async (id: string) => {
  const result = ShopModel.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Shop does not exists!");
  }

  return result;
};

const createShopIntoDB = async (payload: TShop) => {
  const result = await ShopModel.create(payload);

  return result;
};

export const shopServices = {
  getAllShopsFromDB,
  getSingleShopFromDB,
  createShopIntoDB,
};
