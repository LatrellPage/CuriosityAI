const mongoose = require('mongoose');


const validLanguages = ['English', 'Spanish', 'French'];
const validProfessors = ['Turing', 'Professor2', 'Professor3'];

const settingsSchema = new mongoose.Schema({
  language: {
    type: String,
    default: 'English',
    enum: validLanguages, // Enforce language to be one of the valid languages
  },
  professor: {
    type: String,
    default: 'Turing',
    enum: validProfessors, // Enforce professor to be one of the valid professors
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
