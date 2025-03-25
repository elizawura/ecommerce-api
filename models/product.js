import { Schema, model, modelNames, Types } from "mongoose";
import normalize from "normalize-mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // image: { type: String, required: true },
    quantity: { type: Number, required: true },
    pictures: [{ type: String, required: true }],
    userId: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(normalize);
export const ProductModel = model("Product", productSchema);
