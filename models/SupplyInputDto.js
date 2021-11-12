import mongoose from "mongoose";

export default mongoose.models.SupplyInputDto ||
  mongoose.model(
    "SupplyInputDto",
    new mongoose.Schema({
      supplyId: String,
      products: Array,
    }),
  );
