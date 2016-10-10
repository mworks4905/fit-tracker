var express = require('express');
var router = express.Router();
var knex = require('../knex');
var cookieSession = require('cookie-session');



// router.get('/', (req, res, next) => {
//   res.render('day', {
//     points:
//         knex('users')
//         .where('tot_pts')
//         .then((points) => {
//           res.send(points);
//         })
//         .catch((err) => {
//           next(err);
//         });
//       });,
//     dailyPoints: '50',
//   })
// })
// router.get('/', (req, res, next) => {
//   knex('users')
//   .where('id', req.session.userInfo.id)
//   .then((user) => {
//     res.render('day', {
//       points: user[0].tot_pts,
//     })
//   })
// })

router.get('/', (req, res, next) => {
  knex('users')
  .innerJoin('day', 'users.id', 'day.user_id')
  .where('users.id', req.session.userInfo.id)
  .then((user) => {
    res.render('day', {
      points: user[0].tot_pts,
      dailyPoints: user[0].day_pts
    })
  })
})

// Total User points
// router.get('/', function(req, res, next) {
//   knex('users')
//   .where('tot_pts')
//   .then((points) => {
//     res.send(points);
//   })
//   .catch((err) => {
//     next(err);
//   });
// });
//
// // Total daily points
// router.get('/', (req, res, next) => {
//   knex('day')
//   .where('tot_pts')
//   .then((dailyPoints) => {
//     res.send(dailyPoints);
//   })
//   .catch((err) => {
//     next(err);
//   });
// });
//
// router.get('/', (req, res, next) => {
//   // check current time
//   var localTime = () => {
//     var timeInMs = Date.now();
//     var time = new Date(timeInMs);
//     var hours = time.getHours();
//     return hours;
//   };
//   console.log(localTime());
//
//   if(hours >= 0 && hours < 11){
//     //use handlebars to send the text for MORNING
//
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
router.post('/', (req, res, next) => {

})

module.exports = router;
