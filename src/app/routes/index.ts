import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { BrandRoutes } from "../modules/brands/brands.routes";
import { TagRoutes } from "../modules/tags/tags.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { CouponRoutes } from "../modules/coupons/coupons.route";
import { TransactionRoutes } from "../modules/transactions/transactions.route";
import { OrderRoutes } from "../modules/order/order.route";
import { AttributeRoutes } from "../modules/attributes/attributes.route";
import { ShopRoutes } from "../modules/shop/shop.route";
import { TransferRoutes } from "../modules/transfer/transfer.route";
import { VendorRoutes } from "../modules/vendor/vendor.route";
import { CustomerRoutes } from "../modules/customer/customer.route";
import { SuperAdminRoutes } from "../modules/super-admin/superAdmin.route";
import { TermsRoutes } from "../modules/terms/terms.route";
import { TaxRoutes } from "../modules/taxs/taxs.route";
import { ShippingRoutes } from "../modules/shipping/shipping.route";
import { FaqRoutes } from "../modules/faq/faq.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/vendor",
    route: VendorRoutes,
  },
  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/super-admin",
    route: SuperAdminRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/brand",
    route: BrandRoutes,
  },
  {
    path: "/tag",
    route: TagRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/coupon",
    route: CouponRoutes,
  },
  {
    path: "/transaction",
    route: TransactionRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/attribute",
    route: AttributeRoutes,
  },
  {
    path: "/shop",
    route: ShopRoutes,
  },
  {
    path: "/transfer",
    route: TransferRoutes,
  },
  {
    path: "/terms",
    route: TermsRoutes,
  },
  {
    path: "/tax",
    route: TaxRoutes,
  },
  {
    path: "/shipping",
    route: ShippingRoutes,
  },
  {
    path: "/faq",
    route: FaqRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
