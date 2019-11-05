const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  body: {
    type: String
  }
});

const Note = mongoose.model('Note', NotesSchema);

module.exports = Note;
