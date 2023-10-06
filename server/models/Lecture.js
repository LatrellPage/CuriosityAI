const mongoose = require('mongoose');
const Conversation = require('./Conversation')
const Settings = require('./Settings')

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Conversation, 
    required: true,
  },

  lecturesettings: {
    type: String,
    ref: Settings,
    required: true,
  }
});


const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
