var express = require('express');
var router = express.Router();
var knex = require('../knex');


router.get('/', (req, res, next) => {
  res.render('day')
})
// Total User points
router.get('/', function(req, res, next) {
  knex('users')
  .where('tot_pts')
  .then((points) => {
    res.send(points);
  })
  .catch((err) => {
    next(err);
  });
});

// Total daily points
router.get('/', (req, res, next) => {
  knex('day')
  .where('tot_pts')
  .then((points) => {
    res.send(points);
  })
  .catch((err) => {
    next(err);
  });
});

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
//     res.send('morning')//replace with morning tab image
//   };
//   else if(hours >= 11 && hours < 14){
//     res.send('afternoon')//replace with afternoon tab image
//   };
//   else{
//     res.send('evening')//replace with evening tab image
//   };
// });

// router.post('/', (req, res, next) => {
//
// })

module.exports = router;
