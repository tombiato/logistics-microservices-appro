import mongoose from 'mongoose';

const SupplySummaryDtoSchema = new mongoose.Schema({
	nbSupplies: Number,
	totalNbProducts: Number,
	totalPurchasePrice: Number,
});

export default mongoose.model('SupplySummaryDto', SupplySummaryDtoSchema);
