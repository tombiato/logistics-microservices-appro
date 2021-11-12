import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import connectDB from '../config/db';

// MODELS
import SupplyProductDto from '../models/SupplyProductDto';
import SupplyInputDto from '../models/SupplyInputDto';

// GLOBAL
dotenv.config();

const app = express();

connectDB();

// const router = express.Router();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/ping', (req, res) => {
	res.send('Pong');
});

app.post('/api/supply', async (req, res) => {
	try {
		const products = req.body.products;
		const supplyId = req.body.supplyId;

		const catalogue = await axios.get(
			'https://fhemery-logistics.herokuapp.com/api/products'
		);

		let productsArray = [];

		for (const product of products) {
			const newProduct = new SupplyProductDto({
				ean: product.ean,
				name: product.name,
				description: product.description,
				purchasePricePerUnit: product.purchasePricePerUnit,
				quantity: product.quantity,
			});

			productsArray.push(newProduct);
			await newProduct.save();

			const singleProduct = catalogue.data.filter(
				chunk => chunk.ean === product.ean
			);

			const productId = singleProduct[0]._id;

			const targetUrl = `https://logistics-microservices-stock.herokuapp.com/api/stock/${productId}/movement`;

			const res = await axios.post(targetUrl, {
				productId: productId, // This ID is the ID inside the catalogue
				quantity: product.quantity,
				status: 'Supply',
			});

			console.log(res);
		}

		const newInput = new SupplyInputDto({
			supplyId: supplyId,
			products: productsArray,
		});
		await newInput.save();
		
		res.status(204).send();
	} catch (err) {
		console.error(err.message);
	}
});

app.get('/api/supply/summary', async (req, res) => {
	try {
		const supplies = await SupplyProductDto.find({});

		const summary = new SupplySummaryDto({
			nbSupplies: supplies.length,
			totalNbProducts:
				supplies.length > 0
					? supplies
							.map(s => s.quantity)
							.reduce((previous, current) => previous + current)
					: 0,
			totalPurchasePrice:
				supplies.length > 0
					? supplies
							.map(s => s.quantity * s.purchasePricePerUnit)
							.reduce((previous, current) => previous + current)
					: 0,
		});

		res.status(200).json(summary);
	} catch (err) {
		console.error(err.message);
	}
});

app.post('/api/supply-needed', (req, res) => {
	// TODO
});

app.post('/api/supply-request', (req, res) => {
	// TODO
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
