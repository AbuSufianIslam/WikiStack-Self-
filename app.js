const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
	// res.send(console.log('app'));
});

const port = 3000;
app.listen(port, () => {
	console.log(`app is listening on port ${port}`);
});
