var express = require('express');
var router = express.Router();

/* GET home page. */
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.Shortener.findAll()
    .then((shorteners)=>{
      res.render('index', {shorteners:shorteners})
    })
});

module.exports = router;
