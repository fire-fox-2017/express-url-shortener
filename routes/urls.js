var express = require('express');
var router = express.Router();
var helper = require("../helpers/app");

const db = require('../models');

/* this file is not used */
router.get('/', function(req, res, next) {

  db.Url.findAll()
  .then ( urls => {
    res.render('urls', { title: 'Urls', urls: urls });
  })
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: "URL New"});
})



module.exports = router;
