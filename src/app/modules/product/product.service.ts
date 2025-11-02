import logger from "../../config/logger";
import AppError from "../../utils/AppError";
import { Cloudinary } from "../../utils/Cloudinary";
import { generateProductCode } from "../../utils/generateProductCode";
import { categoryModel } from "../category/category.module";
import { TProduct } from "./product.interface";
import { productModel } from "./product.module";

const createProduct = async (product: any) => {
  logger.info("Creating product in product service");
  // console.log(product.body);
  try {
    const productCode = generateProductCode(product?.body?.name);
    if (!productCode) {
      throw new AppError(500, "Failed to generate product code");
    }

    const productWithCode = {
      ...product?.body,
      productCode: productCode,
    };

    logger.info("Generated product code:", productWithCode.ProductCode);
    logger.info("Checking if same productCode exists for the product");
    const isProductExist = await productModel.findOne({
      productCode: product.productCode,
    });
    if (isProductExist) {
      throw new AppError(
        400,
        "Product with the same ProductCode already exists"
      );
    }

    const image_name = `${productWithCode.ProductCode}`;
    const path = product?.file?.path;
    logger.info("Cloudinary Image Uploading...");

    const { secure_url } = await Cloudinary(image_name, path);
    const finalProduct = { ...productWithCode, image: secure_url };
    logger.info(`Final product data prepared for creation:\n ${finalProduct}`);

    const result = await productModel.create(finalProduct);
    logger.info("Product created successfully in product service");
    if (!result) {
      throw new AppError(500, "Product creation failed");
    }
    return result;
  } catch (error) {
    logger.error("Error creating product in product service:", error);
    throw new AppError(500, "Failed to create product");
  }
};
const updateProduct = async (productId: string, data: Partial<TProduct>) => {
  logger.info("Entered Update Product Service");
  try {
    const isExist = await productModel.findById(productId);
    if (!isExist) {
      throw new AppError(404, "Product not found");
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      data,
      {
        new: true,
      }
    );
    logger.info("Product updated successfully in service");
    return updatedProduct;
  } catch (error) {}
};

export const productService = {
  createProduct,
  updateProduct,
};
