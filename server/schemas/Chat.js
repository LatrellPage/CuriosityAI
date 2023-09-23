const mongoose = require('mongoose');
const Conversation = require('./Conversation')

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Conversation, // Reference the Conversation model
    required: true,
  },
});


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
