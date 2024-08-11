import mongoose from "mongoose";

export const dbConnection = mongoose
  .connect(
    "mongodb+srv://e-commerce:0niXGXchFcc1Ah1v@cluster0.m27dpve.mongodb.net/E-commerce2"
  )
  .then(() => {
    console.log("database connected successfully.");
  })
  .catch((err) => {
    console.log("database error " + err);
  });
