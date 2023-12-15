const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true, // Ensures that the Google ID is unique in the database
    sparse: true, // This ensures that this field is not required for all documents
  },
  profilePic: {
    type: String,
    default: 'default-profile-pic.jpg',
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
    required: function() { return !this.googleId; }
  },
  token: {
    type: String
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

