var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Url.findAll()
  .then(urls => {
    urls.forEach(data => {
      console.log(data.id);
    })
    res.render('index', {title: 'URL Shortener', urls: urls});
  })
  .catch(err => {
    console.log(err.message);
  })
});

router.get('/:short_url', (req, res, next) => {
  let id = req.params.short_url
  db.Url.findById(id)
  .then((url) => {
    db.Url.update({counter: url.counter + 1}, {where: {id: id}})
    .then(() => {
      res.redirect(url.url_name);
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
});

router.post('/urls', function(req, res, next) {
  db.Url.create({url_name: req.body.url, counter: 0})
  .then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    console.log(err.message);
  })
});

module.exports = router;
