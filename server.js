const express = require('express');
const exphbs = require('express-handlebars');
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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3030;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsscrapes';

mongoose.connect(MONGODB_URI);

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

app.get('/scrape', (req, res) => {
  scrapeIt('https://www.sciencenews.org/all-stories');
  scrapeIt('https://www.sciencenews.org/all-stories/page/2');
  scrapeIt('https://www.sciencenews.org/all-stories/page/3');
  res.redirect('/');
});

app.get('/', (req, res) => {
  db.Article.find({}).sort({ when: -1 })
    .then(data => res.render('index', { articles: data }))
    .catch(err => console.log(err));
});

app.get('/articles', (req, res) => {
  db.Article.find({})
    .then(dbArticles => res.json(dbArticles))
    .catch(err => console.log(err));
});

app.post('/saved/:id', (req, res) => {
  db.Article.findOneAndUpdate({ _id: req.body._id }, { $set: { saved: true } })
    .then(dbArticles => res.json(dbArticles))
    .catch(err => console.log(err));
});

app.get('/saved', (req, res) => {
  db.Article.find({ saved: true }).sort({ when: -1 })
    .then(data => res.render('saved', { articles: data }))
    .catch(err => console.log(err));
});

// app.get('/api/saved', (req, res) => {
//   db.Article.find({ saved: true }).sort({ when: -1 })
//     .then(dbArticles => res.json(dbArticles))
//     .catch(err => console.log(err));
// });

app.post('/articles/:id', (req, res) => {
  db.Note.create(req.body)
    .then(dbNote => {
     db.Article.findOneAndUpdate({ _id: req.body._id }, { $push: { note: dbNote._id } }, { new: true });
     console.log(dbNote);
    })
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err));
});

app.get('/articles/:id',  (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate('note')
    .then(dbArticle => res.json(dbArticle))
    .catch(err => res.json(err));
});

app.listen(PORT, () => console.log(`App is now listening on port ${PORT} . . .`));
