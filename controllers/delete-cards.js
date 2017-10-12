'use strict';
const cardsModel = require('../models/cards');

module.exports = (req, res) => {
    let cardNumber = req.params.cardNumber.toString();
    try {
        cardsModel.deleteCard(cardNumber);
        res.status(201).send(`card with number ${cardNumber} successfully deleted`);
    } catch (err) {
        console.log(err.message);
        res.status(err.code).send(err.message); // TODO добавить статус к ошибке
    }
};