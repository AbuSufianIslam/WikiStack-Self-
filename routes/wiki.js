const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const { main, addPage, editPage, wikiPage } = require('../views');
// const main = require('../views/main');
// const addPage = require('../views/addPage');
// const editPage = require('../views/editPage');
// const wikipage = require('../views/wikipage');

router.get('/', async (req, res, next) => {
	//res.send(console.log('Got get /wiki/'));
	try {
		const page = await Page.findAll();
		res.send(main(page));
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	const { name, email, title, content, status } = req.body;
	try {
		const [ user, wasCreated ] = await User.findOrCreate({
			where: {
				name,
				email
			}
		});

		const page = await Page.create({
			title,
			content,
			status
		});

		await page.setAuthor(user);

		res.redirect('/wiki/' + page.slug);
	} catch (error) {
		next(error);
	}
});

router.post('/:slug', async (req, res, next) => {
	try {
		const [ updatedRowCount, updatedPages ] = await Page.update(req.body, {
			where: {
				slug: req.params.slug
			},
			returning: true
		});

		res.redirect('/wiki/' + updatedPages[0].slug);
	} catch (error) {
		next(error);
	}
});

router.get('/add', (req, res, next) => {
	res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
	try {
		const page = await Page.findOne({
			where: {
				slug: req.params.slug
			}
		});
		if (page === null) {
			res.sendStatus(404);
		} else {
			const author = await page.getAuthor();
			res.send(wikiPage(page, author));
		}
	} catch (error) {
		next(error);
	}
});

router.get('/:slug/delete', async (req, res, next) => {
	try {
		await Page.destroy({
			where: {
				slug: req.params.slug
			}
		});

		res.redirect('/wiki');
	} catch (error) {
		next(error);
	}
});

router.get('/:slug/edit', async (req, res, next) => {
	try {
		const page = await Page.findOne({
			where: {
				slug: req.params.slug
			}
		});

		if (page === null) {
			res.sendStatus(404);
		} else {
			const author = await page.getAuthor();
			res.send(editPage(page, author));
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
