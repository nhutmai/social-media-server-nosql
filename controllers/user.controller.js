const userService = require('../services/user.service');

class UserController {
    getAllUser = userService.getUsersAndFilter;
    getUserById = userService.getUserById;
    createUser = userService.createUser;
    updateUser = userService.updateUser;
    deleteUser = userService.deleteUser;
}

module.exports = new UserController();