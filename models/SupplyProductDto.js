import mongoose from "mongoose";

export default mongoose.models.SupplyProductDto ||
  mongoose.model(
    "SupplyProductDto",
    new mongoose.Schema({
      ean: String,
      name: String,
      description: String,
      purchasePricePerUnit: String,
      quantity: Number,
    }),
  );
