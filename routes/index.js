var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');

router.get('/', (req, res, next) => {
  res.render('../public/index.html');
})

router.post('/', (req, res, next) => {
  if(req.body.email === '' || req.body.password === ''){
    res.send('Error!!!')
  }else{
    res.end();
  }
});

module.exports = router;
