'use strict';
const cardsModel = require('../models/cards');

module.exports = async(ctx) => {
	const {amount, from, to} = ctx.query;
    let res = ctx.query;
	try {
		await cardsModel.transfer(amount,from,to);
        res.result = 'success';
        ctx.body = res;
	}
	catch (err) {
		res.result = 'error';
		res.reason = err.message;
		ctx.body = res;
	}
};