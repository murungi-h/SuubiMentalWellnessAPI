const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const suubiArticles = mongoose.model('Article', articleSchema);

module.exports = suubiArticles;
