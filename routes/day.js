var express = require('express');
var router = express.Router();
var knex = require('../knex');
var cookieSession = require('cookie-session');
var total = 0;
var day = 0;
var bonusPts = false;
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
      if(day >= 400){
        bonusPts = true;
      }
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
// Give user points for sliders in DAILY points
  knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
    day_pts: day + 25
  }, '*')
  .then((user) => {
    day = user[0].day_pts;
    // If the user reaches daily goal
    // Give the user their bonus points
    if(bonusPts && !user[0].given_bonus_pts){
      knex('day')
      .where('user_id', req.session.userInfo.id)
      .orderBy('id', 'desc')
      .limit(1)
      .update({
        day_pts: day + 100
      }, '*')
      .then((user1) => {
        day = user1[0].day_pts;
      })
    }
    // Give user points for sliders in TOTAL points
    knex('users')
    .where('id', req.session.userInfo.id)
    .update({
      tot_pts: total + 25
    }, '*')
    .then((user2) => {
      total = user2[0].tot_pts;
      // If user has already been given their bonus points
      // change given_bonus_pts in database
      if(bonusPts && !user[0].given_bonus_pts){
        knex('day')
        .where('user_id', req.session.userInfo.id)
        .orderBy('id', 'desc')
        .limit(1)
        .update({
          given_bonus_pts: true
        }, '*')
        // Update total points with bonus points
        .then((user3) => {
          knex('users')
          .where('id', req.session.userInfo.id)
          .update({
            tot_pts: total + 100
          }, '*')
          .then((user4) => {
            total = user4[0].day_pts;
          })
        })
      }
      // Join tables and display new values for total
      // points and daily points through handlebars
      knex('users')
      .innerJoin('day', 'users.id', 'day.user_id')
      .where('users.id', req.session.userInfo.id)
      .then((user5) => {
        res.render('day', {
          points: user5[0].tot_pts,
          dailyPoints: user5[0].day_pts
        })
      })
    })
  })
}

// Check current time
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
