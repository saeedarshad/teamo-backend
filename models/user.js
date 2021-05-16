const mongoose = require('mongoose');

const User = mongoose.model('User', mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String
}));

module.exports = {User};