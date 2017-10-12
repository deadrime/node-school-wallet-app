'use strict';
const CardsModel = require('../models/cards');
module.exports = (req, res) => res.send(CardsModel.getAllCards());
