import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Product } from "../../../database/models/product.model.js";
import {
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";

// 1-Add brand
const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = await Product(req.body);
  await product.save();
  res.status(201).json({ message: "success", product });
});

// 2-Get all Products
const getAllProducts = getAllDocuments(Product);
// 3-Get Product
const getProduct = getDocument(Product);

// 4-Update Product
const updateProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return next(new AppError("Product not found", 404));
  res.status(201).json({ message: "success", product });
});

// 5-Delete Product
const deleteProduct = deleteOne(Product);

export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
