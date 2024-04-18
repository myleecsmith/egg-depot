const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    User_ID: {
        type: Number,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    donor: {
        type: Boolean,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Level: {
        type: String,
        required: true
    }
}, {timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;