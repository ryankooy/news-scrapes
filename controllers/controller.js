const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = db => {
  return {
    scrape: function(req, res) {
      function scrapeIt(url) {

        axios.get(url).then(response => {
          const $ = cheerio.load(response.data);
      
          $('li div').each((i, element) => {
            let result = {};
      
            result.headline = $(element)
              .find('h3')
              .children('a')
              .text().trim();
            result.summary = $(element)
              .children('p.post-item-river__excerpt___3ok6B')
              .text().trim();
            result.URL = $(element)
              .children('h3.post-item-river__title___J3spU')
              .children('a')
              .attr('href');
            result.image = $(element)
              .parent('li')
              .children('figure')
              .children('a')
              .children('img')
              .attr('src');
            result.when = $(element)
              .find('time')
              .text().trim();
      
            if (result.headline && result.summary && result.URL && result.image && result.when) {
              db.Article.create(result)
              .then(dbArticles => console.log(dbArticles))
              .catch(err => console.log(err));
            }
          });
        });
      }

      scrapeIt('https://www.sciencenews.org/all-stories');
      scrapeIt('https://www.sciencenews.org/all-stories/page/2');
      scrapeIt('https://www.sciencenews.org/all-stories/page/3');

      res.redirect('/');
    },
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
    populateNotes: function(req, res) {
      db.Article.findOne({ _id: req.params.id })
        .populate('note')
        .then(data => res.render('modalInput', { note: data }))
        .catch(err => res.json(err));      
    }
  };
};
