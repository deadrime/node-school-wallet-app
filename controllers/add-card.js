'use strict';
const cardsModel = require('../models/cards');

module.exports = (req, res) => {
	const card = req.body;
	try {
		cardsModel.addCard(card);
		//console.log(cardsModel.checkLuhn(card.cardNumber));
		res.status(201).json(card);
	} catch (err) {
		console.log(err.message);
		console.log(err.code);
		res.status(err.code).send(err.message);
	}
};

