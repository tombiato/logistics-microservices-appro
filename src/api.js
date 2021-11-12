const express = require('express');

// GLOBAL
require('dotenv').config();
const port = process.env.PORT || 8000;

const connectDB = require('../config/db');

connectDB();

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World!');
});

router.get('/ping', (req, res) => {
	res.send('Pong');
});

router.post('/api/supply', (req, res) => {
	// TODO
});

router.get('/api/supply/summary', (req, res) => {
	// TODO
});

router.post('/api/supply-needed', (req, res) => {
	// TODO
});

router.post('/api/supply-request', (req, res) => {
	// TODO
});

app.use('/.netlify/functions', router);

// app.listen(port, () => {
// 	console.log(`Example app listening at http://localhost:${port}`);
// });
