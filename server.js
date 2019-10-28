const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3030;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsscrapes';

mongoose.connect(MONGODB_URI);

app.get('/scrape', (req, res) => {
  axios.get('http://www.sciencedaily.com/').then( (response) => {
    const $ = cheerio.load(response.data);

    $('h3.hero').each( (i, element) => {
      const result = {};

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
      .then( (dbArticle) => {
        console.log(dbArticle);
      })
      .catch( (err) => {
        console.log(err);
      });
    });

    res.send('A Scraping Has Occurred');
  });
});

app.get('/articles', (req, res) => {
  db.Article.find({})
    .then( (dbArticle) => {
      res.json(dbArticle);
    })
    .catch( (err) => {
      res.json(err);
    });
});

app.get('/articles/:id',  (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate('note')
    .then( (dbArticle) => {
      res.json(dbArticle);
    })
    .catch( (err) => {
      res.json(err);
    });
});

app.post('/articles/:id', (req, res) => {
  db.Note.create(req.body)
    .then( (dbNote) => {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then( (dbArticle) => {
      res.json(dbArticle);
    })
    .catch( (err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App is now listening on port ${PORT} . . .`);
});
