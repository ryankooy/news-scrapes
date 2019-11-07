const db = require('../models');

module.exports = db => {
  return {
    getAll: function(req, res) {
      db.Article.find({ saved: false }).sort({ when: -1 })
        .then(dbArticles => res.render('index', { articles: dbArticles }))
        .catch(err => res.json(err));
    },
    getSaved: function(req, res) {
      db.Article.find({ saved: true }).sort({ when: -1 })
        .then(dbArticles => res.render('saved', { articles: dbArticles }))
        .catch(err => res.json(err));
    },
    saveArticle: function(req, res) {
      db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true } })
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err));
    },
    saveNote: function(req, res) {
      db.Note.create(req.body)
        .then(dbNote => {
          return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(dbArticle => res.json(dbArticle))
        .catch(err => res.json(err));
    },
    populateNotes: function() {
      db.Article.findOne()
        .select('_id')
        .populate('note')
        .then(data => res.render('modalOutput', { notes: data }))
        .catch(err => res.json(err));      
    }
  };
};
