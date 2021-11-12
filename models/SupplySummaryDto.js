const { model, Schema } = require("mongoose");

module.exports = model(
  "SupplySummaryDto",
  new Schema({
    nbSupplies: Number,
    totalNbProducts: Number,
    totalPurchasePrice: Number,
  }),
);
