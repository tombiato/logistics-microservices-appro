import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import connectDB from '../config/db';

// MODELS
import SupplyProductDto from '../models/SupplyProductDto';
import SupplyInputDto from '../models/SupplyInputDto';
import SupplyRequestDto from '../models/SupplyRequestDto';
import SupplySummaryDto from '../models/SupplySummaryDto';

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

			if (singleProduct[0] === undefined) {
				// 'POST /api/products -> newProduct'
				await axios.post(
					'https://fhemery-logistics.herokuapp.com/api/products',
					{
						ean: newProduct.ean,
						name: newProduct.name,
						description: newProduct.description,
						price: newProduct.purchasePricePerUnit,
						categories: [],
					}
				);
			}

			const productId = singleProduct[0]._id;

			const targetUrl = `https://logistics-microservices-stock.herokuapp.com/api/stock/${productId}/movement`;

			const res = await axios.post(targetUrl, {
				productId: productId, // This ID is the ID inside the catalogue
				quantity: product.quantity,
				status: 'Supply',
			});
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

		await summary.save();

		res.status(200).json(summary);
	} catch (err) {
		console.error(err.message);
	}
});

app.post('/api/supply-needed', async (req, res) => {
	try {
		const productNeededId = req.body.productId;

		if (
			!productNeededId ||
			productNeededId === undefined ||
			productNeededId === null
		) {
			res
				.status(400)
				.send('400 Bad Request: the request is not valid incorrect body');
		}

		const catalogue = await axios.get(
			'https://fhemery-logistics.herokuapp.com/api/products'
		);

		const singleProduct = catalogue.data.filter(
			chunk => chunk._id === productNeededId
		);

		if (!singleProduct || singleProduct == undefined || singleProduct == null) {
			res.status(404).send('404 Not Found: no product finded in the catalogue');
		}

		const eanNeeded = singleProduct[0].ean;

		const supplyRequest = new SupplyRequestDto({
			ean: eanNeeded,
		});

		await supplyRequest.save();

		await axios.post(
			'https://fhemery-logistics.herokuapp.com/api/supply-request',
			supplyRequest
		);

		res.status(204).send({ ean: eanNeeded });
	} catch (err) {
		console.error(err.message);
	}
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
