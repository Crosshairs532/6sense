import logger from "../../config/logger";
import { catchAsync } from "../../utils/CatchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { productService } from "./product.service";
import { status } from "http-status";

const createProduct = catchAsync((req, res) => {
  logger.info("Entered createProduct controller");
  const result = productService.createProduct(req.body);
  logger.info("Product created, sending response from controller");
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const updateProduct = catchAsync(() => {});

export const productController = {
  createProduct,
  updateProduct,
};
