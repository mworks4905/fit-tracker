var express = require('express');
var router = express.Router();
const knex = require('../knex');
var cookieSession = require('cookie-session');

var points = 0

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.userInfo === undefined) {
    res.redirect('index');
  } else {
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
}})


router.post('/', (req, res, next) => {
  console.log("testing POST route");
  let data = req.body
  var points = calcPoints(data.activity, data.time, data.distance)
  console.log("testing our function. Total Points = " + points);
  var day = 0;
  var total = 0;
  knex('day')
    .where('user_id', req.session.userInfo.id)
    .orderBy('id', 'desc')
    .limit(1)
    .then((day) => {
      day = day[0].day_pts;
      knex('day')
        .where('user_id', req.session.userInfo.id)
        .orderBy('id', 'desc')
        .limit(1)
        .update({
          day_pts: day + points
        })
        .then((day2) => {
          knex('users')
            .where('id', req.session.userInfo.id)
            .then((user) => {
              total = user[0].tot_pts;
              knex('users')
                .where('id', req.session.userInfo.id)
                .update({
                  tot_pts: total + points
                })
                .then((user2) => {
                  res.redirect('day');
                })
            })
        })
    })


  // function activityPts(req, res, next) {
  //   knex('day')
  //     .where('users_id', req.session.userInfo.id)
  //     .update({
  //       day_pts: points
  //     }, '*')
  //
  //   knex('users')
  //     .where('users.id', req.session.userInfo.id)
  //     .update({
  //       tot_pts: points
  //     }, '*')
  //     .then(() => {
  //       res.render('activities');
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // };
});

function calcPoints(activity, time, distance, actPts) {
  switch (activity) {
    case "walking":
      actPts = .5;
      break;
    case "hiking":
      actPts = 1;
      break;
    case "biking":
      actPts = 1.5;
      break;
    case "running":
      actPts = 2;
      break;
  }
  return Math.floor(actPts * time * distance * 5);
}


module.exports = router;
