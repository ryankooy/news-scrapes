const router = require('express').Router();

module.exports = db => {
  const controller = require('../controllers/controller')(db);

  router.get('/', controller.getAll);
  router.get('/scrape', controller.scrape);
  router.get('/saved', controller.getSaved);
  router.put('/saved/:id', controller.saveArticle);
  router.post('/articles/:id', controller.saveNote);
  router.get('/articles/:id', controller.populateNotes);

  return router;
};
