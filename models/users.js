const mongoose = require('mongoose');

// defines the user schema
const userSchema = new mongoose.Schema(
    {
        name: String,
        username: String,
        password: String,
        email: String,
        securityQuestion: String,
        securityAnswer: String,
    },
    { collection: 'users' }
);

const usersModel = mongoose.model('User', userSchema);

module.exports = usersModel
