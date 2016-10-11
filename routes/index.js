'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const boom = require('boom');

router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res, next) => {
  if(req.body.login === ''){
    knex('users')
      .where('email', req.body.email)
      .then((user) => {
        if(user.length === 0){
          res.render('index', {message: 'Wrong email or password.'});
        }else{
          if(bcrypt.compareSync(req.body.password, user[0].hash)){
            delete user[0].hash;
            req.session.userInfo = user[0];
            res.redirect('day');
          }else{
            console.log('your password is wrong');
            return next(boom.create(400, 'meow'));
            // res.render('index');
          }
        }
      })
  }
  else if(req.body.signup === ''){
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
        req.session.userInfo = user[0];
        res.render('levels');
      })
  }else{
    console.log('NOOOOOOO');
    knex('users')
      .where('email', req.body.email)
      .then((user) => {
        if(user.length === 0){
          knex('users')
            .returning('*')
            .insert({
              tot_pts: 0,
              lvl: 0,
              email: req.body.email,
              hash: 'password',
              accessToken: req.body.accessToken
            })
            .then((user) => {
              delete user[0].hash;
              delete user[0].accessToken;
              req.session.userInfo = user[0];
              res.render('levels');
            })
        }else{
          delete user[0].hash;
          delete user[0].accessToken;
          req.session.userInfo = user[0];
          res.render('day');
        }
      })
  }
})
module.exports = router;
