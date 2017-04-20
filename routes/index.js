var express = require('express');
var router = express.Router();
var model = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  model.Url.findAll()
  .then(data=>{
    res.render('index', { data : data});
  })
});

router.post('/urls', function(req, res, next) {
  model.Url.create({
      url: req.body.url
      //sortener_url: req.body.phone
    })
    .then(function(user) {
      res.redirect("/")
    });
});

router.get('/:short_url', function(req, res, next) {
  model.Url.find({
      where: {
        sortener_url: req.params.short_url
      }
    })
    .then(function(url) {
      let last = url.count;
        url.updateAttributes({
          count: last+1
          })
          .then(()=>{
            res.redirect("/");
          });
    });
});

module.exports = router;
