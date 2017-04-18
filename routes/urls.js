var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('urls', { title: 'Urls page' });
});

router.get('/new', (req, res, next) => {
  res.render('new', {title: "URL New"});
})

router.post('/create', (req, res, next) => {

})



module.exports = router;
