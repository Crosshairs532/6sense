import logger from "../../config/logger";
import AppError from "../../utils/AppError";
import { generateProductCode } from "../../utils/generateProductCode";
import { categoryModel } from "../category/category.module";
import { TProduct } from "./product.interface";
import { productModel } from "./product.module";

const createProduct = async (product: TProduct) => {
  logger.info("Creating product in product service");

  const productWithCode = {
    ...product,
    ProductCode: generateProductCode(product?.name),
  };
  logger.info("Generated product code:", productWithCode.ProductCode);

  try {
    const result = await productModel.create(product);
    logger.info("Product created successfully in product service");
    return result;
  } catch (error) {
    logger.error("Error creating product in product service:", error);
    throw new AppError(500, "Failed to create product");
  }
};
const updateProduct = async () => {};

export const productService = {
  createProduct,
  updateProduct,
};
