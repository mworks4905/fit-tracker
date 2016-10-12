var express = require('express');
var router = express.Router();
const knex = require('../knex');

/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.session.userInfo === undefined){
    res.redirect('index');
  }else{
    res.render('cheats', {stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
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

});

module.exports = router;
