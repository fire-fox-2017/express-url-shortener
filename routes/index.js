var express = require('express');
var router = express.Router();
const db = require('../models');
var helper = require("../helpers/app");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Url.findAll()
  .then ( urls => {
    res.render('index', { title: 'PDKT', urls: urls });
  })

});

router.post('/create', (req, res, next) => {
  var link = req.body.link;

  // shorten the link.
  // var short_link = helper.randomString();
  // console.log(`short_link='${short_link}'`);

  // db.Url.create({link: link, click_count: 0})
  // .then ( url => {
  //   console.log(`'${url.link}' - '${url.short_link}' has been created`);
  //   res.redirect('/')
  // })

  db.Url.findOrCreate({where: {link:link}})
  .then ( url => {
    console.log(`find or create ${url}`)
    res.redirect('/')
  })

})




router.get('/:short_link', (req, res, next) => {
  var short_link = req.params.short_link;

  //get the full link from short_link
  db.Url.findOne({where: {short_link: short_link}})
  .then ( url => {
    // console.log("hahahaha")
    // console.log(url);
    // console.log(`Found url='${url.link}'`);

    //after found url, update click_count
    db.Url.update({click_count:url.click_count+1}, {fields: ['click_count'], where: {id: url.id}})
    .then ( result => {
      console.log(`result ${result}`)
      console.log(`Updated url='${url.link}' click_count now is ${url.click_count}`);
      res.redirect("http://"+url.link);
    })
  })
  .catch (err => {
    console.log(err.message);
  })

})


module.exports = router;
