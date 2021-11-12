import mongoose from 'mongoose';

const SupplyProductDtoSchema = new mongoose.Schema({
	ean: String,
	name: String,
	description: String,
	purchasePricePerUnit: String,
	quantity: Number,
});

export default mongoose.model('SupplyProductDto', SupplyProductDtoSchema);
