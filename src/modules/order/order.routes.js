import { Router } from "express";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

import {
  createCashOrder,
  createCheckOutSession,
  getOrders,
  getUserOrder,
} from "./order.controller.js";

const orderRouter = Router();

// 1-create cash order
orderRouter.post("/:id", protectedRoutes, allowedTo("user"), createCashOrder);
orderRouter.get("/", protectedRoutes, allowedTo("admin"), getOrders);
orderRouter.get("/user", protectedRoutes, allowedTo("user"), getUserOrder)
orderRouter.post(
  "/checkout/:id",
  protectedRoutes,
  allowedTo("user"),
  createCheckOutSession
);

export default orderRouter;
