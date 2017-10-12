const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

const getCardsController = require('./controllers/get-cards');
const addCardController = require('./controllers/add-card');
const deleteCardController = require('./controllers/delete-cards');

app.get('/', (req, res) => {
	res.send(`<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
			<h1>Hello World!</h1>
		</body>
	</html>`);
});

app.get('/cards', getCardsController);
app.post('/cards', addCardController);
app.delete('/cards/:cardNumber', deleteCardController);

app.get('/error', (req, res) => {
	throw Error('Oops!');
});

app.get('/transfer', (req, res) => {
	const {amount, from, to} = req.query;
	res.json({
		result: 'success',
		amount,
		from,
		to
	});
});

app.listen(3000, () => {
	console.log('YM Node School App listening on port 3000!');
});
