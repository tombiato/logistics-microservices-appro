const express = require('express');
const notificationService = require('./services/notifcation-service');
// GLOBAL
require('dotenv').config();
const port = process.env.PORT || 8000;

const connectDB = require('./config/db');

connectDB();

const app = express();

app.get('/', (req, res) => {
	const resultat = notificationService.ping(4)
	res.send(resultat);
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

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
