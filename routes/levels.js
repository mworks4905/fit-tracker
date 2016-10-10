var express = require('express');
var router = express.Router();
const knex = require('../knex');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('levels')
});

router.post('/update-level/:id', function(req, res, next) {
  console.log("hitting update route");
  // knex('users').where('users.id', req.params.id).first().then((person) {
  //   if (!person) {
  //     const err = new Error('body.id does not exist');
  //     err.status = 400;
  //     throw err;
  //   }
  //   return knex('users')
  //     .where('id', req.params.id)
  //     .update({
  //       tot_pts:
  //       lvl:
  //     }, '*')
  // })
  // .then((books) => {
  //   res.send(humps.camelizeKeys(books[0]));
  //  })
  //   .catch((err) => {
  //    next(err);
  //  });
});

module.exports = router;


// router.patch('/:id', (req, res, next) => {
//   knex('books').where('books.id', req.params.id).first().then((book) => {
//       if (!book) {
//         const err = new Error('body.id does not exist');
//
//         err.status = 400;
//
//         throw err;
//       }
//
//       return knex('books')
//         .where('id', req.params.id)
//         .update({
//           title: req.body.title,
//           author: req.body.author,
//           genre: req.body.genre,
//           description: req.body.description,
//           cover_url: req.body.coverUrl
//         }, '*')
//
//     })
//     .then((books) => {
//       res.send(humps.camelizeKeys(books[0]));
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
