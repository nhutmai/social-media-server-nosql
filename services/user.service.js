const User = require('../models/user.model');
const res = require('express/lib/response');

class UserService {

    async getUsersAndFilter({query}, res) {
        try {
            let {name, limit = 10, page = 1} = query;
            if (limit > 100 || limit < 1 || isNaN(limit)) limit = 10;
            if (page < 1 || isNaN(page)) page = 1;
            const filter = {
                ...(name && {user_name: new RegExp(name, 'i')})
            };

            const countUsers = await User.countDocuments(filter);
            const users = await User.find(filter)
                .skip((+page - 1) * +limit)
                .limit(+limit);
            return res.status(200).json({
                success: true,
                users,
                limit: +limit,
                currentPage: +page,
                totalPages: Math.ceil(countUsers / limit),
                totalUsers: countUsers,
            });

        } catch (error) {
            console.error('Error in getUsers service:', error);
            return res.status(500).json({message: error.message, success: false});
        }
    }

    async getUserById({params}, res) {
        try {
            const {id} = params;
            const user = await User.findById(id).populate('user_posts');

            if (!user) return res.status(404).json({success: false, message: 'user not found'});

            return res.status(200).json({success: true, user});
        } catch (error) {
            console.error('Error in getUserById service:', error);
            return res.status(500).json({message: error.message, success: false});
        }
    }

    async createUser({body}, res) {
        try {
            const newUser = await User.create(body);

            return res.status(201).json({success: true, newUser});

        } catch (error) {
            console.error('Error in createUserService:', error);
            return res.status(400).json({success: false, error: error.message});
        }

    }

    async updateUser({body, params}, res) {
        try {
            const {id} = params;
            const updateUser = await User.findByIdAndUpdate(id, body);

            if (!updateUser) return res.status(404).json({success: false, message: 'User not found'});

            const user = await User.findById(id);

            return res.status(200).json({success: true, message: 'User updated successfully', user});
        } catch (error) {
            console.error('Error in updateUserService:', error.message);
            return res.status(500).json({success: false, message: 'Error in updateUserService:', error: error.message});
        }
    }

    async deleteUser({params}) {
        try {
            const {id} = params;
            const deleteUser = await User.findByIdAndDelete(id);
            if (!deleteUser) return res.status(404).json({success: false, message: 'User not found'});

            return res.status(200).json({success: true, message: 'User deleted successfully'});

        } catch (error) {
            console.error('Error in deleteUserService:', error.message);
            return res.status(500).json({success: false, message: 'server error', error: error.message});
        }
    }
}

module.exports = new UserService();