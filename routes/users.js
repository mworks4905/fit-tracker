var express = require('express');
var router = express.Router();
const knex = require('../knex');
const cookieSession = require('cookie-session');

router.get('/', (req, res, next) => {
  console.log(req.session.userInfo);
  if(req.session.userInfo.is_admin){
    knex('users')
     .where('is_admin', false)
     .orderBy('tot_pts', 'asc')
     .then((users) => {
       res.render('users', {
        stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
            <li class="logout"><a class="logout">Log Out</a></li>
          </ul><ul class="side-nav" id="mobile-demo"><li class="logout"><a class="logout">Log Out</a></ul>`,
         userlist:users
       })
     })
  }else{
    res.redirect('index');
  }

});

router.delete('/', (req, res, next) => {
  console.log(req.body.email);
    knex('users')
    .where('email', req.body.email)
    .del()
    .then((user) => {
      res.send('ok')
    })
});

module.exports = router;
