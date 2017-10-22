'use strict';
const cardsModel = require('../models/cards');

module.exports = async(ctx) => {
    let cardNumber = await ctx.params.cardNumber.toString();
    if (!cardNumber) return ctx.throw(404);
    try {
        await cardsModel.deleteCard(cardNumber);
        ctx.status = 201;
        ctx.body = `card with number ${cardNumber} successfully deleted`;
    }
    catch (err) {
        ctx.throw(err.code,err.message);
    }
};