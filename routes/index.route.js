const express = require('express');
const router = express.Router();
const userRoutes = require("./user/user.route");
const postRoutes = require("./post/post.route");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;