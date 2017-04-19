var express = require('express');
var router = express.Router();

// var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
// var base = alphabet.length; // base is the length of the alphabet (58 in this case)
//
// // utility function to convert base 10 integer to base 58 string
// function encode(num){
//   var encoded = '';
//   while (num){
//     var remainder = num % base;
//     num = Math.floor(num / base);
//     encoded = alphabet[remainder].toString() + encoded;
//   }
//   return encoded;
// }
//
// // utility function to convert a base 58 string to base 10 integer
// function decode(str){
//   var decoded = 0;
//   while (str){
//     var index = alphabet.indexOf(str[0]);
//     var power = str.length - 1;
//     decoded += index * (Math.pow(base, power));
//     str = str.substring(1);
//   }
//   return decoded;
// }

// module.exports.encode = encode;
// module.exports.decode = decode;
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Url.findAll()
    .then((_url)=>{
      _url.forEach((data)=>{
        console.log(data.id);
      })
      res.render('index', { title: 'Url Shortener', url: _url });
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
        click_count: row.click_count+1
      },{where: {id: _id}})
        .then(()=>{
          res.redirect(row.url_list)
        })
    })
    .catch((err)=>{
      console.log(err.message);
    })
})


router.post('/create', function(req, res, next) {
  db.Url.create({
    url_list : req.body.url,
    click_count : 0
  })
  .then(()=>{
    res.redirect('/')
  })
  .catch((err)=>{
    console.log(err.message);
  })
});

module.exports = router;
