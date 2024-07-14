import { Category } from "../../../database/models/category.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import {
  addDocument,
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";

// 1-Add category
const addCategory = addDocument(Category);

// 2-Get all categories
const getAllCategories = getAllDocuments(Category);

// 3-Get category
const getCategory = getDocument(Category);

// 4-Update category
const updateCategory = catchError(async (req, res, next) => {
  if (req.body.slug) req.body.slug = slugify(req.body.name);

  if (req.file) {
    const existCategory = await Category.findById(req.params.id);
    if (!existCategory) return next(new AppError("category not found", 404));

    if (existCategory.image) {
      const oldImg = path.join(__dirname, "uploads", existCategory.image);
      fs.unlinkSync(oldImg);
    }

    req.body.image = req.file.filename;
  }

  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) return next(new AppError("category not found", 404));
  res.status(201).json({ message: "success", category });
});

// 5-Delete category
const deleteCategory = deleteOne(Category);

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
