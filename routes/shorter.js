var express = require('express');
var router = express.Router();

/* GET home page. */
var db = require('../models');

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('form_add_link')
});

router.post('/add', function(req, res, next) {
  let obj = {
    originalLink : req.body.originalLink,
    count : 0,
    createdAt : new Date(),
    updatedAt : new Date()
  }

  db.Shortener.create(obj)
            .then(()=>{
              res.redirect('/')
            })
});

router.get('/destination/:id', function(req, res, next) {
  console.log(req.params.id);
    db.Shortener
    .findById(req.params.id)
    .then((shortener)=>{
      let value = shortener.count+1;
      db.Shortener.update( {count: value},{ where : { id : req.params.id }})
      .then(()=>{
        res.redirect('http://'+shortener.originalLink);
      })
    })
});


module.exports = router;
