import { model, models, Schema } from "mongoose";

export default models.SupplyInputDto ||
  model(
    "SupplyInputDto",
    new Schema({
      supplyId: String,
      products: Array,
    }),
  );
