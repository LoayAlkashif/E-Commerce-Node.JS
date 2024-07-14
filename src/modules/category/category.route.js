import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { validate } from "../../middleware/validate.js";
import { categoryValidation } from "./category.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import subcategoryRouter from "../subCategory/subcategory.routes.js";

const categoryRouter = Router();

// 1-Add category
categoryRouter.post(
  "/",
  uploadSingleFile("image", "categories"),
  validate(categoryValidation),
  addCategory
);

// 2-Get all categories
categoryRouter.get("/", getAllCategories);

// 3-Get category
categoryRouter.get("/:id", getCategory);

// 4-Update category
categoryRouter.put(
  "/:id",
  uploadSingleFile("image", "categories"),
  updateCategory
);

// 5-Delete category
categoryRouter.delete("/:id", deleteCategory);

//Get subCategories from Category
categoryRouter.use("/:category/subcategories", subcategoryRouter);
export default categoryRouter;
