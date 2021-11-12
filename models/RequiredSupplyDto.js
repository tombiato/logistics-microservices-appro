import { model, models, Schema } from "mongoose";

export default models.RequiredSupplyDto ||
  model(
    "RequiredSupplyDto",
    new Schema({
      productId: String,
    }),
  );
