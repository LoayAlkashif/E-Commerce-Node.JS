import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    name: String,
    password: String,
    email: String,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = model("User", schema);