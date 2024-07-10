import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    comment: String,
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Review = model("Review", schema);
