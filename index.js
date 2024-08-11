import express from "express";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/middleware/globalError.js";
import { bootstrap } from "./src/bootstrap.js";
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import { catchError } from "./src/middleware/catchError.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  catchError((req, res) => {
    const sig = req.headers["stripe-signature"].toString();

    let event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_ZL8b0G0NwJD86SdB52zotki89WUrlQh3"
    );

    let checkout;
    if (event.type == "checkout.session.completed") {
      checkout = event.data.object;
    }

    // Return a 200 res to acknowledge receipt of the event
    res.json({ message: "Success", checkout });
  })
);

app.use(cors());
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
