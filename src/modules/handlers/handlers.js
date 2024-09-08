import slugify from "slugify";
import { ApiFeature } from "../../utils/apiFeature.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// refactor add document
export const addDocument = (model) => {
  return catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);

    if (req.file && req.file.fieldname === "logo") {
      req.body.logo = req.file.filename;
    } else {
      req.body.image = req.file.filename;
    }

    let document = await model(req.body);
    await document.save();
    res.status(201).json({ message: "success", document });
  });
};

//refactor get one
export const getDocument = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    if (!document) return next(new AppError("document not found", 404));

    res.status(200).json({ message: "success", document });
  });
};

// refactor get all and handle pagination
export const getAllDocuments = (model) => {
  return catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeature(model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .search()
      .pagination();

    // Get the total number of model
    let totalDocuments = await model.countDocuments();
    let totalPages = Math.ceil(totalDocuments / apiFeatures.limit);

    // pagination info
    let paginationInfo = {
      currentPage: apiFeatures.pageNumber,
      totalPages: totalPages,
      totalItems: totalDocuments,
      nextPage:
        apiFeatures.pageNumber < totalPages ? apiFeatures.pageNumber + 1 : null,
      previousPage:
        apiFeatures.pageNumber > 1 ? apiFeatures.pageNumber - 1 : null,
    };
    // get documents
    let documents = await apiFeatures.mongooseQuery;

    res
      .status(200)
      .json({ message: "success", pagination: paginationInfo, documents });
  });
};

// refactor delete one
export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);

    if (!document) return next(new AppError("document not found", 404));

    // Function to delete a file if it exists
    const deleteFile = (filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.error(`File not found: ${filePath}`);
      }
    };

    // Delete logo if it exists (used in brands)
    if (document.logo) {
      const logoPath = path.join(
        __dirname,
        "../../../uploads/brands",
        path.basename(document.logo)
      );
      deleteFile(logoPath);
    }

    // Delete image if it exists (used in categories)
    if (document.image) {
      const imagePath = path.join(
        __dirname,
        "../../../uploads/categories",
        path.basename(document.image)
      );
      deleteFile(imagePath);
    }

    // Delete imageCover if it exists (used in products)
    if (document.imageCover) {
      const imageCoverPath = path.join(
        __dirname,
        "../../../uploads/products",
        path.basename(document.imageCover)
      );
      deleteFile(imageCoverPath);
    }

    // Delete images if they exist (used in products)
    if (document.images && document.images.length > 0) {
      document.images.forEach((img) => {
        const imagePath = path.join(
          __dirname,
          "../../../uploads/products",
          path.basename(img)
        );
        deleteFile(imagePath);
      });
    }

    res.status(200).json({ message: "success", document });
  });
};
