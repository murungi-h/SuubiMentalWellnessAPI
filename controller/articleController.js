const articleModel = require('../models/article.model');

const getAllArticles =  async(req, res) => {
    try {
        const allArticles = await articleModel.find({});
        res.status(200).json(allArticles);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

const getOneArticle = async(req, res) => {
    try {
        const { id } = req.params;
        const oneArticle = await articleModel.findById(id);
        return res.status(200).json(oneArticle);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

module.exports = {
    getAllArticles,
    getOneArticle
}
