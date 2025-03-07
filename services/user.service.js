const User = require('../models/user.model');

class UserService {

    async getUsersAndFilter({query}) {
        try {
            let {name, limit = 10, page = 1} = query;
            if (limit > 100 || limit < 1 || isNaN(limit)) limit = 10;
            if (page < 1 || isNaN(page)) page = 1;
            const filter = {
                ...(name && {user_name: new RegExp(name, "i")}),
            };

            const countUsers = await User.countDocuments(filter);
            const users = await User.find(filter)
                .skip((+page - 1) * +limit)
                .limit(+limit);
            return {
                success: true,
                users,
                limit: +limit,
                currentPage: +page,
                totalPages: Math.ceil(countUsers / limit),
                totalUsers: countUsers,
            }

        } catch (error) {
            console.error("Error in getUsers service:", error);
            throw new Error("Error fetching users");
        }
    }

    async getUserById({params}) {
        try {
            const {id} = params;
            const user = await User.findById(id).populate('user_posts');

            if (!user) {
                return {
                    success: false,
                    status: 404,
                    message: "User not found",
                };
            }

            return {
                success: true,
                status: 200,
                user,
            };
        } catch (error) {
            console.error("Error in getUserById service:", error);
            throw new Error("Error fetching user");
        }
    }

    async createUser({body}) {
        const newUser = await User.insertOne(body)
        return {
            success: true,
            status: 201,
            newUser,
        }
    }

    async updateUser({body, params}) {

        const {id} = params;
        const updateUser = await User.findByIdAndUpdate(id, body);
        if (!updateUser) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            }
        }
        const user = await User.findById(id)
        return {
            success: true,
            status: 200,
            message: "User updated successfully",
            user,
        }


    }

    async deleteUser({params}) {
        const {id} = params;
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            return {
                success: false,
                status: 404,
                message: "User not found",
            }
        }
        return {
            success: true,
            message: "User deleted successfully",
            status: 200,
        }
    }
}

module.exports = new UserService();