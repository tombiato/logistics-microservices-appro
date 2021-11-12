import mongoose from 'mongoose';

export default mongoose.models.SupplyRequestDto ||
	mongoose.model(
		'SupplyRequestDto',
		new mongoose.Schema({
			ean: String,
		})
	);
