const postService = require("../services/post.service");

class PostController {
    async requestHandler(handler, req, res) {
        try {
            const result = await handler(req, res);
            const {status, ...data} = result;
            return res.status(status || 200).json(data);

        } catch (error) {
            console.error("Error in requestHandler:", error);
            return res.status(500).json({success: false, message: "Internal Server Error", error: error.message});
        }
    }

    callService = (method) => (req, res) => this.requestHandler(postService[method], req, res)

    getAllPost = this.callService("getPostAndFilter");
    updatePost = this.callService("updatePost");
    createPost = this.callService("createPost");
    deletePost = this.callService("deletePost");
}

module.exports = new PostController();