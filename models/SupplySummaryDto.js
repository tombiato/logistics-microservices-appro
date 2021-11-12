import { model, models, Schema } from "mongoose";

export default models.SupplySummaryDto ||
  model(
    "SupplySummaryDto",
    new Schema({
      nbSupplies: Number,
      totalNbProducts: Number,
      totalPurchasePrice: Number,
    }),
  );
