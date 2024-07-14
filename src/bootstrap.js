import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.route.js";
import productRouter from "./modules/product/product.routes.js";
import subcategoryRouter from "./modules/subCategory/subcategory.routes.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subcategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/categories", productRouter);
};
