var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pendekar' });
});


module.exports = router;
