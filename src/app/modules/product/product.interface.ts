import { Types } from "mongoose";

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
