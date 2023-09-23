const mongoose = require('mongoose');
const Chat = require('./Chat'); 
const Settings = require('./Settings'); 


const userSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    default: 'default-profile-pic.jpg', // You can set a default profile picture
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Chat, 
    },
  ],
  settings: {
    type: Settings.schema, // Reference the Settings schema
    default: () => ({}), // You can set default settings here
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
