var express = require('express');
var router = express.Router();
var knex = require('../knex');
var cookieSession = require('cookie-session');
var total = 0;
var day = 0;
var timeOfDay = ['Morning', 'Afternoon', 'Evening'];

router.get('/', (req, res, next) => {
  if(req.session.userInfo === undefined){
    res.redirect('index');
  }else{
    knex('users')
    .innerJoin('day', 'users.id', 'day.user_id')
    .where('users.id', req.session.userInfo.id)
    .then((user) => {
      total = user[0].tot_pts;
      day = user[0].day_pts;
      res.render('day', {
        points: user[0].tot_pts,
        dailyPoints: user[0].day_pts,
        TOD: localTime(),
        stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
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
        </ul>`
      })
    })
  }
})

router.put('/', (req, res, next) => {
    if (req.body.m_health && req.body.value) {
         giveUserPts(req, res, next);
    }
    if (req.body.m_water && req.body.value) {
         giveUserPts(req, res, next);
    }
    if (req.body.a_health && req.body.value) {
         giveUserPts(req, res, next);
    }
    if (req.body.a_water && req.body.value) {
         giveUserPts(req, res, next);
    }
    if (req.body.n_health && req.body.value) {
         giveUserPts(req, res, next);
    }
    if (req.body.n_water && req.body.value) {
         giveUserPts(req, res, next);
    }
})

function giveUserPts(req, res, next){
  knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
    day_pts: day + 25
  }, '*')
  .then((user) => {
    day = user[0].day_pts;
    knex('users')
    .where('id', req.session.userInfo.id)
    .update({
      tot_pts: total + 25
    }, '*')
    .then((user1) => {
      total = user1[0].tot_pts;
      knex('users')
      .innerJoin('day', 'users.id', 'day.user_id')
      .where('users.id', req.session.userInfo.id)
      .then((user2) => {
        res.render('day', {
          points: user2[0].tot_pts,
          dailyPoints: user2[0].day_pts
        })
      })
    })
  })
}
// check current time
function localTime(){
  var timeInMs = Date.now();
  var time = new Date(timeInMs);
  var hours = time.getHours();

  if(hours >= 0 && hours < 11){
    return timeOfDay[0]
  }
  else if(hours >= 11 && hours < 14){
    return timeOfDay[1]
  }
  else{
    return timeOfDay[2]
  }
};

module.exports = router;
