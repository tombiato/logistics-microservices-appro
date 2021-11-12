import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import connectDB from '../config/db';

// GLOBAL
dotenv.config();

const app = express();

connectDB();

// const router = express.Router();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/ping', (req, res) => {
	res.send('Pong');
});

app.post('/api/supply', async (req, res) => {
	try {
		// const [supplyId, products] = req.body.SupplyInputDto;

		const catalogue = await axios.get(
			'https://fhemery-logistics.herokuapp.com/api/products'
		);

		console.log(catalogue.data);
		// for (const product of products) {
		// 	productId = GET productId FROM data WHERE EAN = product.ean
		// 	targetUrl = `/api/stock/${product.ean}/movement`;
		// 	const res = await axios.post(targetUrl, {
		// 		productId: product.name, // This ID is the ID inside the catalogue
		// 		quantity: product.quantity,
		// 		status: 'Supply',
		// 	});
		// }

		res.status(204).send();
	} catch (err) {
		console.error(err.message);
	}
});

app.get('/api/supply/summary', (req, res) => {
	// TODO
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
