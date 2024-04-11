const suubiArticles  = require('../models/article.model');

//get all posts
const blogPosts = async(req, res) => {
    try {
        const blog = await suubiArticles.find({});
        console.log('Blog post accessed!');
        return res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}

//get a single post by ID
const idBlogPosts = async(req, res) => {
    try {
        const { id } = req.params;
        const idPost = await suubiArticles.findById(id);
        return res.status(200).json(idPost);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

//create a new blog post
const createBlogPost = async(req, res) => {
    try {
        const post = req.body;
        const createNewPost = await suubiArticles.create(post);
        return res.status(201).json(createNewPost);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    blogPosts,
    idBlogPosts,
    createBlogPost
}
