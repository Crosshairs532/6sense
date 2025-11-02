import { Types } from "mongoose";
import z from "zod";

export type TProduct = {
  name: string;
  price: number;
  description?: string;
  category: Types.ObjectId;
  Status: boolean;
  discount: number;
  image: string;
  ProductCode: string;
};
export const ProductValidationSchema = z.object({
  name: z.string({ error: "Name is required" }),
  price: z.number({ error: "Price is required" }),
  description: z.string({ error: "Description is required" }),
  category: z.string({ error: "Category is required" }),
  Status: z.boolean(),
  discount: z.number(),
  image: z.string({ error: "image is required" }),
  ProductCode: z.string().optional(),
});
