const express = require('express');
const { blogPosts, idBlogPosts, createBlogPost }= require('../controller/blogController');

const router = express.Router();

//get all blog posts
router.get('/posts', blogPosts)

//get all blog posts by id
router.get('/posts/:id', idBlogPosts);

//create a blog post
router.post('/create', createBlogPost);

module.exports = router;
