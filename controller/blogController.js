const suubiArticles  = require('../models/article.model');

const blogPosts = async(req, res) => {
    try {
        const blog = await suubiArticles.find({});
        console.log('Blog post accessed!');
        return res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}

const idBlogPosts = async(req, res) => {
    try {
        const { id } = req.params;
        const idPost = await suubiArticles.findById(id);
        return res.status(200).json(idPost);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    blogPosts,
    idBlogPosts
}
