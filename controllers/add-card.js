'use strict';
const cardsModel = require('../models/cards');

module.exports = async(ctx) => {
    console.log(ctx.request.body);
    const card = ctx.request.body;
    try {
    	await cardsModel.addCard(card);
    	ctx.status = 201;
    	ctx.body = card;
	}
	catch (err){
        console.log(err.message);
		console.log(err.code);
        ctx.throw(err.code,err.message);
	}
};

