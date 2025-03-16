const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management APIs
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     description: Get all users with optional filtering
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search for users by name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page (default is 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Current page (default is 1)
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user_name:
 *                         type: string
 *                 totalUsers:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/', UserController.getAllUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve user information by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Detailed information of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *       404:
 *         description: User not found
 */
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: API to create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - user_last_name
 *               - email
 *               - user_contact
 *               - user_gender
 *               - user_id_card
 *               - user_major
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "John Doe"
 *               user_last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               user_contact:
 *                 type: object
 *                 properties:
 *                   user_phone:
 *                     type: string
 *                     example: "0987654321"
 *                   user_address:
 *                     type: string
 *                     example: "123 ABC Street, HCM City"
 *                   user_facebook:
 *                     type: string
 *                     example: "https://facebook.com/johndoe"
 *               user_gender:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               user_id_card:
 *                 type: string
 *                 example: "123456789"
 *               user_major:
 *                 type: string
 *                 example: "Information Technology"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status:
 *                   type: integer
 *                 newUser:
 *                   type: object
 */
router.post('/', UserController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     description: API to update user information by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "John Smith"
 *               user_last_name:
 *                 type: string
 *                 example: "Smith"
 *               email:
 *                 type: string
 *                 example: "johnsmith@example.com"
 *               user_contact:
 *                 type: object
 *                 properties:
 *                   user_phone:
 *                     type: string
 *                     example: "0981234567"
 *                   user_address:
 *                     type: string
 *                     example: "456 XYZ Street, Hanoi"
 *                   user_facebook:
 *                     type: string
 *                     example: "https://facebook.com/johnsmith"
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *       404:
 *         description: User not found
 */
router.put('/:id', UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: API to delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: Deletion successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 */
router.delete('/:id', UserController.deleteUser);

module.exports = router;
