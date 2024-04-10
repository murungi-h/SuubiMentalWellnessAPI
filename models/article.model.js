const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    },

});

const suubiArticles = mongoose.model('Article', articleSchema);

module.exports = suubiArticles;
