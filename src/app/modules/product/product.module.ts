import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
  },

  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  status: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
});

export const productModel = model("Product", productSchema);
