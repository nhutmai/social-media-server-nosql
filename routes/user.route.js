const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     description: Trả về danh sách tất cả người dùng với bộ lọc
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm kiếm người dùng theo tên
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng người dùng trên mỗi trang (mặc định là 10)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại (mặc định là 1)
 *     responses:
 *       200:
 *         description: Danh sách người dùng
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
router.get('/', UserController.getAllUser)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin một người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần lấy
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của người dùng
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
 *         description: Không tìm thấy người dùng
 */
router.get('/:id', UserController.getUserById)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo mới người dùng
 *     description: API để tạo mới một người dùng
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
 *                 example: "Nguyễn Văn A"
 *               user_last_name:
 *                 type: string
 *                 example: "Nguyễn"
 *               email:
 *                 type: string
 *                 example: "nguyenvana@example.com"
 *               user_contact:
 *                 type: object
 *                 properties:
 *                   user_phone:
 *                     type: string
 *                     example: "0987654321"
 *                   user_address:
 *                     type: string
 *                     example: "123 Đường ABC, TP.HCM"
 *                   user_facebook:
 *                     type: string
 *                     example: "https://facebook.com/nguyenvana"
 *               user_gender:
 *                 type: number
 *                 enum: [0, 1]
 *                 example: 1
 *               user_id_card:
 *                 type: string
 *                 example: "123456789"
 *               user_major:
 *                 type: string
 *                 example: "Công nghệ thông tin"
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
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
 *     summary: Cập nhật thông tin người dùng
 *     description: API để cập nhật thông tin của người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "Nguyễn Văn B"
 *               user_last_name:
 *                 type: string
 *                 example: "Bùi"
 *               email:
 *                 type: string
 *                 example: "nguyenvanb@example.com"
 *               user_contact:
 *                 type: object
 *                 properties:
 *                   user_phone:
 *                     type: string
 *                     example: "0981234567"
 *                   user_address:
 *                     type: string
 *                     example: "456 Đường XYZ, Hà Nội"
 *                   user_facebook:
 *                     type: string
 *                     example: "https://facebook.com/nguyenvanb"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
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
 *         description: Không tìm thấy người dùng
 */
router.put('/:id', UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: API để xóa người dùng theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
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
 *         description: Không tìm thấy người dùng
 */
router.delete('/:id', UserController.deleteUser);

module.exports = router;
