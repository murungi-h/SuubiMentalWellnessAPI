const express = require('express');
const { blogPosts, idBlogPosts }= require('../controller/blogController');

const router = express.Router();

//get all blog posts
router.get('/posts', blogPosts)

//get all blog posts by id
router.get('/posts/:id', idBlogPosts);

module.exports = router;
