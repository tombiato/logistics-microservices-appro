import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import connectDB from '../config/db';

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

		const catalogue = await axios.get(
			'https://fhemery-logistics.herokuapp.com/api/products'
		);

		for (const product of products) {
			//reste à enregister en BDD les Supplies
			const singleProduct = catalogue.data.filter(
				chunk => chunk.ean === product.ean
			);

			const productId = singleProduct[0]._id;

			const targetUrl = `/api/stock/${productId}/movement`;

			const res = await axios.post(targetUrl, {
				productId: productId, // This ID is the ID inside the catalogue
				quantity: product.quantity,
				status: 'Supply',
			});

			console.log(res);
		}

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
