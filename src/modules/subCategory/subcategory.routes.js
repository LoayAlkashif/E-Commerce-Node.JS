import { Router } from "express";

import { subcategoryValidation } from "./subcategory.validation.js";
import { validate } from "../../middleware/validate.js";
import {
  addSubcategory,
  deleteSubcategory,
  getAllSubcategory,
  getSubcategory,
  updateSubcategory,
} from "./subcategory.controller.js";

const subcategoryRouter = Router({ mergeParams: true });

// 1-Add subcategory
subcategoryRouter.post("/", validate(subcategoryValidation), addSubcategory);

// 2-Get all subcategory
subcategoryRouter.get("/", getAllSubcategory);

// 3-Get subcategory
subcategoryRouter.get("/:id", getSubcategory);

// 4-Update subcategory
subcategoryRouter.put("/:id", updateSubcategory);

// 5-Delete subcategory
subcategoryRouter.delete("/:id", deleteSubcategory);

export default subcategoryRouter;
