const mongoose = require('mongoose');


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
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture", 
    },
  ],
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;
