import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { shopControllers } from "./shop.controller";
import { createShopZodSchema } from "./shop.validations";

const router = express.Router();

router.get("/", shopControllers.getAllShop);

router.get("/:id", shopControllers.getSingleShop);

router.post(
  "/create-shop",
  validateRequest(createShopZodSchema),
  shopControllers.createShop
);

export const ShopRoutes = router;
