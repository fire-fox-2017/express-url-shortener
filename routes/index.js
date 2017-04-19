var express = require('express');
var router = express.Router();
var title = "Simple URL Shortener";
var Url = require("../models").Url;

function isShortUrlDupl(url, callback) {
  Url.findAll({where: {short_url : url}})
    .then((urls) => {
      if (urls.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    }).catch((err) => {
      callback(err);
    });
}

function isOriUrlDupl(url, callback) {
  Url.findAll({where: {ori_url : url}})
    .then((urls) => {
      // console.log(urls);
      if (urls.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    }).catch((err) => {
      callback(err);
    });
}

function generator() {
  let short_url = "";
  let limit = Math.floor(Math.random()*3) + 4;
  let alph = "abcdefhijklmnopqrstuvwxyz".split("");
  for (let i = 0; i < limit; i++) {
    let upLow = Math.floor(Math.random()*2);
    let letter = alph[Math.floor(Math.random()*(alph.length))];
    if (upLow > 0) {
      letter = letter.toUpperCase();
    }
    short_url += letter;
  }
  return short_url;
  // isShortUrlDupl(short_url, (found) => {
  //   if(found) {
  //     console.log('true???');
  //     generator();
  //   } else {
  //     console.log('must be false');
  //     // console.log(short_url);
  //     return short_url;
  //   }
  // });
}

function showAllUrl(callback) {
  Url.findAll().then((urls) => callback(urls)).catch((err) => callback(err));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Url.findAll().then((urls) => {
    res.render('index', { title: title, shortUrl: null, oriUrl: null, allUrl: urls });
  }).catch();
});


router.post('/',function(req, res, next) {
  let short_url = generator();
  console.log("it's here");
  console.log(short_url);
  let ori_url = req.body.ori_url;
  if (ori_url !== null) {
    isOriUrlDupl(ori_url, (urls) => {
      if(urls) {
        Url.findOne({where: {ori_url: ori_url}})
          .then((foundUrl) => {
            Url.findAll().then((urls) => {
              res.render('index', { title: title, shortUrl: foundUrl.short_url, oriUrl : foundUrl.ori_url, allUrl: urls });
            }).catch((err) => {
              res.send(err);
            });
          }).catch((err) => {
            res.redirect('/');
          });
      } else {
        Url.create({ori_url: req.body.ori_url, short_url: short_url, click_count: 0})
          .then((newUrl) => {
            Url.findAll().then((urls) => {
              res.render('index', { title: title, shortUrl: short_url, oriUrl : ori_url, allUrl: urls });
            }).catch((err) => {
              res.send(err);
            });
          }).catch((err) => {
            res.send(err);
          });
      }
    });
  } else {
    res.redirec('/');
  }
});


router.get('/:shortUrl', function(req, res) {
  Url.findOne({where: {short_url : req.params.shortUrl}})
    .then((url) => {
      let counter = url.click_count + 1;
      Url.update({click_count: counter}, {where: {id: url.id}})
        .then((updated) => {
          res.redirect('/');
          // res.redirect('domain_name'+url.ori_url);
        }).catch((err) => {
          res.send(err);
        });
    }).catch((err) => {
      res.send(er);
    });
});


module.exports = router;
