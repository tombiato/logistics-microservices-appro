import express from 'express';
import dotenv from 'dotenv';
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
