var express = require('express');
var router = express.Router();
var knex = require('../knex');
var cookieSession = require('cookie-session');
var total = 0;
var day = 0;
var hours = 5;

router.get('/', (req, res, next) => {
  knex('users')
  .innerJoin('day', 'users.id', 'day.user_id')
  .where('users.id', req.session.userInfo.id)
  .then((user) => {
    //console.log(req.session.userInfo.id);
    total = user[0].tot_pts;
    day = user[0].day_pts;
    res.render('day', {
      points: user[0].tot_pts,
      dailyPoints: user[0].day_pts
    })
  })
})


router.get('/', (req, res, next) => {
  console.log(hours);
  if(hours >= 0 && hours < 11){
    // knex('day')
    // .where('user_id', req.session.userInfo.id)
    // .orderBy('id', 'desc')
    // .limit(1)
    // .then((data) => {
      res.render('day', {TOD:'Morning'})//replace with morning tab image
    // })
  };
  // else if(hours >= 11 && hours < 14){
  //
  //   res.render('day', {TOD:'Afternoon'})//replace with afternoon tab image
  // };
  // else{
  //
  //   res.render('day', {TOD:'Evening'})//replace with evening tab image
  // };
});

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
var localTime = () => {
  var timeInMs = Date.now();
  var time = new Date(timeInMs);
  var hours = time.getHours();
  return hours;
};
//console.log(localTime());




module.exports = router;
