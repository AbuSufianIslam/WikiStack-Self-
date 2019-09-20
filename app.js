const express = require('express');
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.get('/', (req, res, next) => {
// 	// res.send(console.log('app'));
// });
// app.use('/wiki', require('./routes/wiki'));
// app.use('/users', require('./routes/user'));

db.authenticate().then(() => {
	console.log('connected to the database');
});

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', function(req, res) {
	res.redirect('/wiki/');
});

const port = 3000;

const init = async () => {
	// await Page.sync();
	// await User.sync();
	//await db.sync({ force: true });
	await db.sync();
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	});
};

init();
