const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ['user', 'ai'], 
    required: true,
  },
  timestamp: {
    type: String,
  },
});

const conversationSchema = new mongoose.Schema({
  messages: [messageSchema], 
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

