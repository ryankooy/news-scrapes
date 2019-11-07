const router = require('express').Router();

module.exports = db => {
  router.get('/', (req, res) => {
    res.render('index');
  });
  router.get('/saved', (req, res) => {
    res.render('saved');
  });

  return router;
};
