const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')();
const router = require('koa-router')();
const serve = require('koa-static');

app.use(bodyParser);
app.use(router.routes());
app.use(serve('./public'));

app.listen(3000, () => {
	console.log('Hello world');
});

const getCardsController = require('./controllers/get-cards');
const addCardController = require('./controllers/add-card');
const deleteCardController = require('./controllers/delete-cards');
const transferController = require('./controllers/transfer-cards');

router.get('/cards', getCardsController);
router.post('/cards', addCardController);
router.delete('/cards/:cardNumber', deleteCardController);
router.get('/transfer', transferController);
