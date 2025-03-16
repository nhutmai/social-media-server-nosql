const postService = require('../services/post.service');

class PostController {
    getAllPost = postService.getPostAndFilter;
    updatePost = postService.updatePost;
    createPost = postService.createPost;
    deletePost = postService.deletePost;
}

module.exports = new PostController();