import { Router } from "express";
import { validation } from "../../middlewares/validation";
import { ProductValidationSchema } from "./product.interface";
import { productController } from "./product.controller";
import { upload } from "../../utils/Cloudinary";

const ProductRouter = Router();

// ProductRouter.get("/", ());
ProductRouter.post(
  "/create",
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req?.body?.data);
    next();
  },
  validation(ProductValidationSchema),
  productController.createProduct
);
ProductRouter.patch("/update/:id", productController.updateProduct);

export default ProductRouter;
