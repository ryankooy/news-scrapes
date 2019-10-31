const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
});

const Article = mongoose.model('Article', ArticlesSchema);

module.exports = Article;
