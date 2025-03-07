const Post = require('../models/post.model');
const User = require('../models/user.model');

class PostService {

    async getPostAndFilter({title, content, limit = 10, page = 1}) {
        try {
            const filter = {
                ...(title && {post_title: new RegExp(title, "i")}),
                ...(content && {post_content: new RegExp(content, "i")}),
            }

            const countPosts = await Post.countDocuments(filter);
            const post = await Post.find(filter)
                .populate('post_author')
                .limit(+limit)
                .skip((+page - 1) * +limit);
            return {
                success: true,
                post,
                limit: +limit,
                currentPage: +page,
                totalPages: Math.ceil(countPosts / limit),
                totalPosts: countPosts,
            }

        } catch (error) {
            console.error("Error in getPost service:", error);
            throw new Error("Error fetching post");
        }
    }

    async createPost({body}) {
        const newPost = await Post.insertOne(body);
        const userId = newPost.post_author;
        const user = await User.findById(userId);
        user.user_posts.push(newPost._id)
        await user.save();
        return {
            success: true,
            status: 201,
            newPost,
        }
    }

    async updatePost({body, params}) {
        const {id} = params
        const updatePost = await Post.findByIdAndUpdate(id, body);
        if (!updatePost) {
            throw new Error("Post not found");
        }

    }

    async deletePost({params}) {
        const {id} = params;
        const deletePost = await Post.findByIdAndDelete(id);
        if (!deletePost) {
            throw new Error("Post not found");
        }
        return {
            success: true,
            message: "Post deleted successfully",
        }
    }
}

module.exports = new PostService();