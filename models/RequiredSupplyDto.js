import mongoose from "mongoose";

export default mongoose.models.RequiredSupplyDto ||
  mongoose.model(
    "RequiredSupplyDto",
    new mongoose.Schema({
      productId: String,
    }),
  );
