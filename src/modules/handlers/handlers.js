import { catchError } from "../../middleware/catchError.js";

// refactor add document
export const addDocument = (model) => {
  return catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    if (req.body.logo) {
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
  return catchError(async (req, res) => {
    let pageNumber = req.query.page * 1 || 1;
    if (pageNumber < 1) pageNumber = 1;
    let limit = 2;
    let skip = (pageNumber - 1) * limit;

    // Get the total number of model
    let totalDocuments = await model.countDocuments();
    let totalPages = Math.ceil(totalDocuments / limit);

    // get documents
    let documents = await model.find().skip(skip).limit(limit);

    // pagination info
    let paginationInfo = {
      currentPage: pageNumber,
      totalPages: totalPages,
      totalItems: totalDocuments,
      nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      previousPage: pageNumber > 1 ? pageNumber - 1 : null,
    };

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
    res.status(200).json({ message: "success", document });
  });
};
