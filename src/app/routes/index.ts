import { Router } from "express";
import ProductRouter from "../modules/product/product.route";
import categoryRouter from "../modules/category/category.route";

const router = Router();

const routes = [
  {
    path: "/product",
    route: ProductRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
];

routes.forEach(({ path, route }) => {
  return router.use(path, route);
});

export default router;
