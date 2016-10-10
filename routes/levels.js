var express = require('express');
var router = express.Router();
const knex = require('../knex');

/* GET users listing. */

router.get('/', (req, res, next) => {
  res.render('levels')
});

router.put('/', (req, res, next) => {
  // console.log('doing the put!')
  let level = req.body.level
  let points = 0
  console.log(req.body)
  if(level === '1') {
    points = 500
  } else if (level === '2') {
    points = 250
  } else {
    points = 0
  }
  return knex('users')
    .where('users.id', req.session.userInfo.id)
    .update({
      tot_pts: points,
      lvl: level}, '*')

  .then(() => {
    res.render('day', req.session.userInfo);
   })
    .catch((err) => {
     next(err);
   });
});

// updatePost(post){
//     return knex('posts')
//     .where('posts.id', post.id)
//     .update(post)
//   },

// router.post('/update/:id', (req, res, next) => {
//   // console.log("hitting update route");
//   console.log("req.body:", req.body);
//   knex('users').where('users.id', req.session.userInfo.id).first().then((person) => {
//     if (!person) {
//       const err = new Error('Please sign-up: id does not exist');
//       err.status = 400;
//       throw err;
//     }
//     return knex('users')
//       .where('id', req.session.userInfo.id)
//       .update({
//         lvl: req.body.level
//       }, '*')
//   })
//   .then((updated) => {
//     res.send('you changed your level:', updated);
//    })
//     .catch((err) => {
//      next(err);
//    });
// });

module.exports = router;
