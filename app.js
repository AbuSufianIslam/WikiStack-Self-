const express = require('express');
const { db, Page, User } = require('./models');

const app = express();

app.get('/', (req, res, next) => {
	// res.send(console.log('app'));
});

db.authenticate().then(() => {
	console.log('connected to the database');
});

const port = 3000;

const init = async () => {
	// await Page.sync();
	// await User.sync();
	await db.sync({ force: true });
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	});
};

init();
