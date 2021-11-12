import mongoose from 'mongoose';
import SupplyProductDto from './SupplyProductDto';

const SupplyInputDtoSchema = new mongoose.Schema({
	supplyId: String,
	products: Array,
});

export default mongoose.model('SupplyInputDto', SupplyInputDtoSchema);
