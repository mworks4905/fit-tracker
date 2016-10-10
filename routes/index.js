var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');

router.get('/', (req, res, next) => {
  res.render('index')
})

module.exports = router;
