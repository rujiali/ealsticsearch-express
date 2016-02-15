var express = require('express');
var router = express.Router();

var elastic = require('../controllers/elasticsearch');

/* Check status */
router.get('/status', function (req, res, next) {
  elastic.status().then(function (result) { res.json(result) });
});

/* Match all */
router.post('/all', function (req, res, next) {
  elastic.matchAll(req.body.index, req.body.type).then(function (result) { res.json(result) });
});

/* Search string */
router.post('/search/:string', function (req, res, next) {
  elastic.searchString(req.body.index, req.body.query).then(function (result) { res.json(result) });
});

/* Get mapping */
router.post('/mapping', function (req, res, next) {
  elastic.getMapping(req.body.index, req.body.type).then(function (result) { res.json(result) });
});

/* Perform msearch */
router.post('/msearch', function (req, res, next) {
  elastic.msearch(req.body.query_body).then(function (result) { res.json(result) });
});

module.exports = router;