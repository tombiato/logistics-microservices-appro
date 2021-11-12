import mongoose from "mongoose";

export default mongoose.models.SupplySummaryDto ||
  mongoose.model(
    "SupplySummaryDto",
    new mongoose.Schema({
      nbSupplies: Number,
      totalNbProducts: Number,
      totalPurchasePrice: Number,
    }),
  );
