const Post = require('../models/post.model');
const User = require('../models/user.model');

class PostService {

    async getPostAndFilter({title, content, limit = 10, page = 1}, res) {
        try {
            const filter = {
                ...(title && {post_title: new RegExp(title, 'i')}),
                ...(content && {post_content: new RegExp(content, 'i')})
            };

            const countPosts = await Post.countDocuments(filter);
            const post = await Post.find(filter)
                .populate('post_author')
                .limit(+limit)
                .skip((+page - 1) * +limit);

            return res.status(200).json({
                success: true,
                post,
                limit: +limit,
                currentPage: +page,
                totalPages: Math.ceil(countPosts / limit),
                totalPosts: countPosts,
            });

        } catch (error) {
            console.error('Error in getPost service:', error);
            return res.status(500).json({success: false, error: error.message});
        }
    }

    async createPost({body}, res) {
        try {
            const newPost = await Post.create(body);
            const userId = newPost.post_author;
            const user = await User.findById(userId);
            user.user_posts.push(newPost._id);
            await user.save();
            return res.status(201).json({
                success: true,
                status: 201,
                newPost,
            });
        } catch (error) {
            console.error('Error in createPostService:', error);
            return res.status(500).json({success: false, error: error.message});
        }
    }

    async updatePost({body, params}, res) {
        try {
            const {id} = params;
            const updatePost = await Post.findByIdAndUpdate(id, body);
            if (!updatePost) {
                return res.status(404).json({success: false, message: 'post not found'});
            }

            const post = await Post.findById(updatePost._id);

            return res.status(200).json({success: true, message: 'User updated successfully', post});
        } catch (error) {
            console.error('Error in updatePostService:', error);
            return res.status(500).json({success: false, error: error.message});
        }
    }

    async deletePost({params}, res) {
        try {
            const {id} = params;
            const deletePost = await Post.findByIdAndDelete(id);

            if (!deletePost) {
                return res.status(404).json({success: false, message: 'post not found'});
            }

            return res.status(200).json({
                success: true,
                message: 'Post deleted successfully',
            });
        } catch (error) {
            console.error('Error in deletePostService:', error);
            return res.status(500).json({success: false, error: error.message});
        }
    }
}

module.exports = new PostService();