import categoryRouter from "./modules/category/category.route.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
};
