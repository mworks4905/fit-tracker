'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res, next) => {
  if(req.body.login === ''){
    knex('users')
      .where('email', req.body.email)
      .then((user) => {
        if(user.length === 0){
          console.log('you are not a user in our database');
          res.render('index');
        }else{
          if(bcrypt.compareSync(req.body.password, user[0].hash)){
            console.log('you are logged in!');
            delete user[0].hash;
            req.session.userInfo = user[0];
            res.render('index');
          }else{
            console.log('your password is wrong');
            res.render('index');
          }
        }
      })
  }
  if(req.body.signup === ''){
    knex('users')
      .returning('*')
      .insert({
        tot_pts: 0,
        lvl: 0,
        email: req.body.email,
        hash: bcrypt.hashSync(req.body.password, 12)
      })
      .then((user) => {
        delete user[0].hash;
        console.log(req.session);
        console.log(user[0]);
        req.session.userInfo = user[0];
        res.render('index');
      })
  }
})
module.exports = router;
