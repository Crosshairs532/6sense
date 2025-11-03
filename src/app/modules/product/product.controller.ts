import logger from "../../config/logger";
import { catchAsync } from "../../utils/CatchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { productService } from "./product.service";
import { status } from "http-status";

const createProduct = catchAsync(async (req, res) => {
  logger.info("Entered createProduct controller");

  const data = { body: req?.body, file: req?.file };
  const result = await productService.createProduct(data);
  logger.info("Product created, sending response from controller");

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  logger.info("Entered updateProduct controller");

  const result = await productService.updateProduct(id, data);
  logger.info("Product updated, sending response from controller");

  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const getProduct = catchAsync(async (req, res) => {
  logger.info("Entered getProduct controller");
  const result = await productService.getProduct(req.query);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
  getProduct,
};
