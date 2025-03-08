const express = require('express');
const router = express.Router();
const postController = require('../../controllers/post.controller');

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 */
router.get('/', postController.getAllPost)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     responses:
 *       201:
 *         description: The post was created
 */
router.post('/', postController.createPost)

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *     responses:
 *       200:
 *         description: The post was updated
 */
router.put('/:id', postController.updatePost)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       204:
 *         description: The post was deleted
 */
router.delete('/:id', postController.deletePost)

module.exports = router;