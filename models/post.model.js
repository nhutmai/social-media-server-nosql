const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_title: {type: String, required: true},
    post_content: {type: String, required: true, maxlength: 255},
    post_author: {type: mongoose.Types.ObjectId, ref: 'User'},

}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
