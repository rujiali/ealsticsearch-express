var express = require('express');
var router = express.Router();

var auth = require('../middlewares/authentication');

/* Authentication path. */
router.post('/', function(req, res, next) {
  res.json(auth.authenticate(req.body.name, req.body.pass));
});

module.exports = router;
