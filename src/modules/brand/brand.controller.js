import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Brand } from "../../../database/models/brand.model.js";
import {
  addDocument,
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";

// 1-Add brand
const addBrand = addDocument(Brand);

// 2-Get all brands
const getAllBrands = getAllDocuments(Brand);

// 3-Get brand
const getBrand = getDocument(Brand);

// 4-Update brand
const updateBrand = catchError(async (req, res, next) => {
  if (req.body.slug) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;

  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand) return next(new AppError("brand not found", 404));
  res.status(201).json({ message: "success", brand });
});

// 5-Delete brand
const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
