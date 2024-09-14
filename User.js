const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tokens: Number
});

module.exports = mongoose.model('User', userSchema);
