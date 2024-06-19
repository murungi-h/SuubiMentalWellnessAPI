const express = require('express');
const { getAllArticles, getOneArticle }  = require('../controller/article.controller');
const router = express.Router();

//get all articles from database
router.get('/all', getAllArticles);

//get one article from the database
router.get('/:id', getOneArticle);

module.exports = router;
