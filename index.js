const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
let bd = JSON.parse(fs.readFileSync('./source/cards.json', 'utf8'));

function isValid(card) {
	if ('balance' in card) {
		let cardBalance = card.balance;
		let validBalance = Number.isInteger(cardBalance); // вот тут не уверен.
		if (!validBalance) return false
	}
	else {
		card['balance'] = 0 // если поля нет - можно его добавить.
	}
	if ('cardNumber' in card) {
		let cardNumber = card.cardNumber;
		let length = cardNumber.length;
		let validLength = length === 16;
		let validNumber = /^[0-9]*$/.test(cardNumber);
		let alreadyInBd = bd.some(c => c.cardNumber === cardNumber);
		if (validLength && validNumber && !alreadyInBd) {
			return true
		}
	}
	return false
}

function findCard(cardNumber) {
	for (let [id,card] of bd.entries()) {
		//console.log(card);
		//console.log(card.cardNumber);
		if (card.cardNumber === cardNumber) {
			return id;
		}
	}
	return false;
}

app.get('/', (req, res) => {
	res.send(`<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
			<h1>Hello Smolny!</h1>
		</body>
	</html>`);
});

app.get('/cards', (req, res) => {
	res.send(bd);
});

app.post('/cards', (req, res) => {
	let newCard = req.body;
	//console.log(newCard);
	if (isValid(newCard)) {
		bd.push(newCard);
		res.send(newCard);
	}
	else {
		res.status(400).send('Bad request');
	}
});

app.delete('/cards/:cardNumber', (req, res) => {
	let cardNumber = req.params.cardNumber.toString();
	let id = findCard(cardNumber);
	if (id) {
		bd.splice(id, 1);
		res.send('Success');
	}
	else {
		res.status(404).send('Card not found');
	}
});

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
