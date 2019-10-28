var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');
var db = require('./models');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var PORT = process.env.PORT || 3030;

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsscrapes';

mongoose.connect(MONGODB_URI);

app.get('/scrape', function(req, res) {
  axios.get('http://www.sciencedaily.com/').then(function(response) {
    var $ = cheerio.load(response.data);

    $('h3.hero').each(function(i, element) {
      var result = {};

      result.headline = $(this)
        .children('a')
        .text();
      result.summary = $(this)
        .children('')
        .text();
      result.URL = $(this)
        .children('')
        .attr('href');
      result.image = $(this)
        .children('a')
        .attr('href');

      db.Article.create(result)
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
    });

    res.send('Scrape Complete');
  });
});

app.get('/articles', function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get('/articles/:id', function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate('note')
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post('/articles/:id', function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log(`App is now listening on port ${PORT} . . .`);
});
