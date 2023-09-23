const mongoose = require('mongoose');
const moment = require('moment-timezone');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ['user', 'ai'], // Enumerate the possible senders
    required: true,
  },
  timestamp: {
    type: String,
    default: () => moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss z'),
  },
});

const conversationSchema = new mongoose.Schema({
  messages: [messageSchema], // Combine user and AI messages into a single array
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

