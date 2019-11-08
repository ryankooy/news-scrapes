// TODO:
// - make the #save-article button effectively update 'saved' to true
// - bind notes to individual articles

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

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(require('./routes/apiRoutes')(db));
app.use(require('./routes/htmlRoutes'));

app.listen(PORT, () => console.log(`App is now listening on port ${PORT} . . .`));

module.exports = app;
