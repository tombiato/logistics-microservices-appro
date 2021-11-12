import mongoose from 'mongoose';

const RequiredSupplyDtoSchema = new mongoose.Schema({
	productId: String,
});

export default mongoose.model('RequiredSupplyDto', RequiredSupplyDtoSchema);
