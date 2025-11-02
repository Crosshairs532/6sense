import { Router } from "express";
import { validation } from "../../middlewares/validation";
import { ProductValidationSchema } from "./product.interface";
import { productController } from "./product.controller";

const ProductRouter = Router();

// ProductRouter.get("/", ());
ProductRouter.post(
  "/create",
  validation(ProductValidationSchema),
  productController.createProduct
);
ProductRouter.patch("/update", (req, res) => {});

export default ProductRouter;
