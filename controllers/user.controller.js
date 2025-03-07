const userService = require("../services/user.service");

class UserController {

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

    callService = (method) => (req, res) => this.requestHandler(userService[method], req, res)

    getAllUser = this.callService("getUsersAndFilter");
    getUserById = this.callService("getUserById");
    updateUser = this.callService("updateUser");
    createUser = this.callService("createUser");
    deleteUser = this.callService("deleteUser");

}

module.exports = new UserController();