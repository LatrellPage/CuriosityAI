const mongoose = require('mongoose');


const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation', 
    required: false,
  },

  lecturesettings: {
    type: String,
    ref: 'Settings',
    default: null,
  }
});


const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
