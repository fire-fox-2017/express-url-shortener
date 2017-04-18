var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Url.findAll()
    .then((_url)=>{
      _url.forEach((data)=>{
        console.log(data.id);
      })
      res.render('index', { title: 'Express', url: _url });
    })
    .catch((err)=>{
      console.log(err.message);
    })
});

router.get('/:short_url',(req,res,next)=>{
  let _id = req.params.short_url
  db.Url.findById(_id)
    .then((row)=>{
      db.Url.update({
        counter: row.counter+1
      },{where: {id: _id}})
        .then(()=>{
          res.redirect(row.url_name)
        })
    })
    .catch((err)=>{
      console.log(err.message);
    })
})

router.post('/add', function(req, res, next) {
  res.render('addform', { title: 'Form add URL' });
});

router.post('/create', function(req, res, next) {
  db.Url.create({
    url_name : req.body.url,
    counter : 0
  })
  .then(()=>{
    res.redirect('/')
  })
  .catch((err)=>{
    console.log(err.message);
  })
});

module.exports = router;
