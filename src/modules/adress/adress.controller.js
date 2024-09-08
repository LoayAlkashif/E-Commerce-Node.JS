import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

import { User } from "../../../database/models/user.model.js";

// 1-Add Address
const addAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { addresses: req.body } },
    { new: true }
  );
  if (!address) return next(new AppError("address not found", 404));
  res.status(201).json({ message: "success", address: address.addresses });
});

const getLoggedAddresses = catchError(async (req, res, next) => {
  let address = await User.findById(req.user._id);
  if (!address) return next(new AppError("address not found", 404));
  res.status(200).json({ message: "success", address: address.addresses });
});

// 3- remove address
const removeAdresses = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
   req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    {
      new: true,
    }
  );
  if (!address) return next(new AppError("address not found", 404));
  res.status(200).json({ message: "success", address: address.addresses });
});

export { addAddress, removeAdresses, getLoggedAddresses };
