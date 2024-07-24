import express from "express";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/middleware/globalError.js";
import { bootstrap } from "./src/bootstrap.js";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/uploads", express.static("uploads"));

bootstrap(app);
app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.error(err);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`server is running.`));
