const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    user_last_name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Regex kiểm tra email hợp lệ
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    user_contact: {
        type: Object,
        default: {
            user_phone: {type: String, required: true, minlength: 8, maxlength: 11},
            user_address: {type: String, required: true, minlength: 4, maxlength: 255},
            user_facebook: {type: String, required: true, minlength: 4, maxlength: 255},
        }
    },
    user_gender: {type: Number, required: true, enum: [ 0, 1 ]},
    user_id_card: {type: String, required: true, minlength: 9, maxlength: 12},
    user_major: {type: String, required: true, minlength: 2, maxlength: 255},
    user_posts: [ {type: mongoose.Types.ObjectId, ref: 'Post'} ]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
