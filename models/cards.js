'use strict';

const fs = require('fs');
const ValidationError = require('../libs/card-validation-error');


class cards {
	constructor() {
		this._bd = JSON.parse(fs.readFileSync('./source/cards.json', 'utf8'));
	}
	async getAllCards() {
		return await this._bd;
	}
	async addCard(card) {
		console.log(card);
		let newId = this._bd[this._bd.length -1].id + 1;
		card.id = newId;
        await this.isValidCard(card);
		await this._bd.push(card);
		console.log(this._bd)
	}
	async deleteCard(cardNumber) {
		let card = await this.findCard(cardNumber);
		await this._bd.splice(card.id - 1, 1);
	}
	async transfer(amount, from, to) {
		let {fromCard, toCard} = {};
        try {
        	fromCard = this.findCard(from);
        	toCard = this.findCard(to);
		}
        catch (err) {
			throw new ValidationError('One or two card not found', 404);
		}
		let newFromCardBalance = parseInt(fromCard.balance) - parseInt(amount);
        let newToCardBalance = parseInt(toCard.balance) + parseInt(amount);
		if (newFromCardBalance < 0) throw new ValidationError('Insufficient funds for this operation', 400);
        fromCard.balance = newFromCardBalance.toString();
        toCard.balance = newToCardBalance.toString();
        this._bd[fromCard.id-1] = fromCard;
        this._bd[toCard.id-1] = toCard;
	}

    findCard(cardNumber) {
        for (let card of this._bd) {
            if (card.cardNumber === cardNumber) {
                return card;
            }
        }
        throw new ValidationError('not found', 404);
    }

	checkLuhn(cardNumber) {
		let sum = 0;
		let nDigits = cardNumber.length;
		let parity = nDigits % 2;
		for (let i = 0;i<nDigits;i++) {
			let digit = parseInt(cardNumber[i]);
			if (i % 2 === parity) {
				digit*=2;
				if (digit>9) {
					digit-=9
				}
			}
			sum+=digit;
		}
		return (sum % 10 === 0)
	}

	isValidCard(card) {
		if ('balance' in card) {
			let cardBalance = card.balance;
			let validBalance = Number.isInteger(cardBalance); // вот тут не уверен.
			if (!validBalance) throw new ValidationError('Invalid card format (balance must be integer)', 400)
		}
		else {
			card['balance'] = 0 // если поля нет - можно его добавить.
		}
		if ('cardNumber' in card) {
			let cardNumber = card.cardNumber;
			let length = cardNumber.length;
			let validLength = length === 16;
			let validNumber = /^[0-9]*$/.test(cardNumber);
			let alreadyInBd = this._bd.some(c => c.cardNumber === cardNumber);
			let checkLuhn = this.checkLuhn(cardNumber);
			if (validLength && validNumber && !alreadyInBd && checkLuhn) {
				return true
			}
			else {
                throw new ValidationError('Invalid card number format', 404)
			}
		}
		else {
            throw new ValidationError('must include "cardNumber" field', 404)
        }
	}
}

const cardsModel = new cards();

module.exports = cardsModel;
