var express = require('express');
var router = express.Router();
var knex = require('../knex');
var cookieSession = require('cookie-session');
var total = 0;
var day = 0;

router.get('/', (req, res, next) => {
  knex('users')
  .innerJoin('day', 'users.id', 'day.user_id')
  .where('users.id', req.session.userInfo.id)
  .then((user) => {
    total = user[0].tot_pts;
    day = user[0].day_pts;
    res.render('day', {
      points: user[0].tot_pts,
      dailyPoints: user[0].day_pts
    })
  })
})

router.put('/', (req, res, next) => {
    if (req.body.m_health && req.body.value) {
          giveUserPts();
            // knex('day')
            //     .where('user_id', req.session.userInfo.id)
            //     .orderBy('id', 'desc')
            //     .limit(1)
            //     .update({
            //         day_pts: day + 25
            //     }, '*')
            //     .then((user) => {
            //         day = user.day_pts;
            //         //try returning the knex promises
            //         knex('users')
            //             .where('id', req.session.userInfo.id)
            //             .update({
            //                 tot_pts: total + 25
            //             }, '*')
            //             .then((user1) => {
            //                 total = user1[0].tot_pts;
            //                 knex('users')
            //                     .innerJoin('day', 'users.id', 'day.user_id')
            //                     .where('users.id', req.session.userInfo.id)
            //                     .then((user2) => {
            //                         res.render('day', {
            //                             points: user2[0].tot_pts,
            //                             dailyPoints: user2[0].day_pts
            //                         })
            //                     })
            //             })
            //     })

    }
})

function giveUserPts(){
  knex('day')
    .where('user_id', req.session.userInfo.id)
    .orderBy('id', 'desc')
    .limit(1)
    .update({
        day_pts: day + 25
    }, '*')
    .then((user) => {
        day = user.day_pts;
        //try returning the knex promises
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

// router.get('/', (req, res, next) => {
//   // check current time
//   var localTime = () => {
//     var timeInMs = Date.now();
//     var time = new Date(timeInMs);
//     var hours = time.getHours();
//     return hours;
//   };
//   //console.log(localTime());
//
//   if(hours >= 0 && hours < 11){
//     //use handlebars to send the text for MORNING
//     res.send('morning')//replace with morning tab image
//   };
//   else if(hours >= 11 && hours < 14){
//     //use handlebars to send the text for AFTERNOON
//     res.send('afternoon')//replace with afternoon tab image
//   };
//   else{
//     //use handlebars to send the text for EVENING
//     res.send('evening')//replace with evening tab image
//   };
// });
//
// // router.post('/', (req, res, next) => {
// //
// // })

module.exports = router;
