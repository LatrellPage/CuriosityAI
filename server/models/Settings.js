const mongoose = require('mongoose');


const settingsSchema = new mongoose.Schema({
  language: {
    type: String,
    default: 'en', // Default language (e.g., English)
  },
  voice: {
    type: String,
    default: 'default-voice', // Default voice
  },
});


const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
