import { Router } from "express";

import {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const couponRouter = Router();

couponRouter.use(protectedRoutes, allowedTo("admin"),)
// 1-Add coupons
couponRouter.post("/",  addCoupon);

// 2-Get all coupons
couponRouter.get("/", getAllCoupons);

// 3-Get coupons
couponRouter.get("/:id", getCoupon);

// 4-Update coupons
couponRouter.put("/:id", updateCoupon);

// 5-Delete coupons
couponRouter.delete("/:id", deleteCoupon);

export default couponRouter;
