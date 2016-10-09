var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');

router.get('/', (req, res, next) => {
  res.redirect('index')
})

module.exports = router;
