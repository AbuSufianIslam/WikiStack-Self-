const express = require('express');
const router = express.Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages');
const { User, Page } = require('../models');

// router.get('/', async (req, res, next) => {
// 	res.send(console.log('Got get /user/'));
// 	try {
// 		const users = await User.findAll();
// 		console.log('userList users', users);
// 		res.send(userList(users));
// 	} catch (error) {
// 		next(error);
// 	}
// });
router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll();
		res.send(userList(users));
	} catch (error) {
		next(error);
	}
});

router.get('/:userId', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: Number(req.params.userId)
			}
		});

		const pages = await Page.findAll({
			where: {
				authorId: Number(req.params.userId)
			}
		});

		res.send(userPages(user, pages));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
