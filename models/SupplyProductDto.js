import { model, models, Schema } from "mongoose";

export default models.SupplyProductDto ||
  model(
    "SupplyProductDto",
    new Schema({
      ean: String,
      name: String,
      description: String,
      purchasePricePerUnit: String,
      quantity: Number,
    }),
  );
