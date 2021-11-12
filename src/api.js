const express = require('express');

// GLOBAL
require('dotenv').config();

const app = express();

const connectDB = require('../config/db');

connectDB();

// const router = express.Router();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/ping', (req, res) => {
	res.send('Pong');
});

app.post('/api/supply', (req, res) => {
	// TODO
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
