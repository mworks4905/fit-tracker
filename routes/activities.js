var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userInfo === undefined){
    res.redirect('index');
  }else{
    res.render('activities', {stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
      <li><a class="logout" href="/">Log Out</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="day">Day</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="activities">Activities</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="cheats">Cheats</a></li>
    </ul>`})
  }
  // res.render('index', {
  //   title: 'Express'
  // });
});

module.exports = router;
