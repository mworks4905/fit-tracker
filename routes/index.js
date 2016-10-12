'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const boom = require('boom');

router.get('/', (req, res, next) => {
  console.log(req.sesh);
  if(req.sesh){
    console.log(req.sesh);
    req.session = null;
  }
 if (req.session.userInfo !== undefined) {
  res.render('index', {
   stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
      <li><a href="/">Log Out</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="day">Day</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="activities">Activities</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="cheats">Cheats</a></li>
    </ul>`
  })
 } else {
  res.render('index')
 }
})

router.post('/', (req, res) => {
 if (req.body.login === '') {
  if (req.body.email === '') {
   res.render('index', {
    email: 'email',
    stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
      <li><a href="/">Log Out</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="day">Day</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="activities">Activities</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="cheats">Cheats</a></li>
    </ul>`
   })
  } else if (req.body.password === '') {
   res.render('index', {
    stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
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
    </ul>`,
    pswd: 'pswd'
   })
  } else {
   knex('users')
    .where('email', req.body.email)
    .then((user) => {
     if (user.length === 0) {
      res.render('index', {
       error: 'blahblah',
       stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
         <li><a href="/">Log Out</a></li>
       </ul>
       <ul id="nav-mobile" class="right hide-on-med-and-down">
         <li><a href="day">Day</a></li>
       </ul>
       <ul id="nav-mobile" class="right hide-on-med-and-down">
         <li><a href="activities">Activities</a></li>
       </ul>
       <ul id="nav-mobile" class="right hide-on-med-and-down">
         <li><a href="cheats">Cheats</a></li>
       </ul>`
      })
     } else {
      if (bcrypt.compareSync(req.body.password, user[0].hash)) {
       delete user[0].hash;
       req.session.userInfo = user[0];
       res.redirect('day');
      } else {
       res.render('index', {
        error: 'blahblah',
        stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
          <li><a href="/">Log Out</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="day">Day</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="activities">Activities</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="cheats">Cheats</a></li>
        </ul>`
       });
      }
     }
    })
  }
 } else if (req.body.signup === '') {
  if (req.body.email === '') {
   res.render('index', {
    email: 'email',
    stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
      <li><a href="/">Log Out</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="day">Day</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="activities">Activities</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="cheats">Cheats</a></li>
    </ul>`
   })
  } else if (req.body.password === '') {
   res.render('index', {
    pswd: 'pswd',
    body: `<ul id='nav-mobile' class="right hide-on-med-and-down">
      <li><a href="/">Log Out</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="day">Day</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="activities">Activities</a></li>
    </ul>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li><a href="cheats">Cheats</a></li>
    </ul>`
   })
  } else {
   knex('users')
    .where('email', req.body.email)
    .then((user) => {
     if (user.length === 0) {
      knex('users')
       .returning('*')
       .insert({
        tot_pts: 0,
        lvl: 0,
        email: req.body.email,
        hash: bcrypt.hashSync(req.body.password, 12)
       })
       .then((user1) => {
        console.log(user1[0]);
        knex('day')
         .returning('*')
         .insert({
          user_id: user1[0].id,
          day_pts: 0,
          m_health: false,
          m_water: false,
          a_health: false,
          a_water: false,
          n_health: false,
          n_water: false
         })
         .then((user2) => {
          delete user1[0].hash;
          req.session.userInfo = user1[0];
          res.redirect('/levels');
         })
       })
     } else {
      res.render('index', {
       stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
          <li><a href="/">Log Out</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="day">Day</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="activities">Activities</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="cheats">Cheats</a></li>
        </ul>`,
       logged: 'blahblah'
      });
     }
    })
  }

 } else {
  knex('users')
   .where('email', req.body.email)
   .then((user) => {
    if (user.length === 0) {
     knex('users')
      .returning('*')
      .insert({
       tot_pts: 0,
       lvl: 0,
       email: req.body.email,
       hash: 'password',
       accessToken: req.body.accessToken
      })
      .then((user1) => {
       knex('day')
        .returning('*')
        .insert({
         user_id: user1[0].id,
         day_pts: 0,
         m_health: false,
         m_water: false,
         a_health: false,
         a_water: false,
         n_health: false,
         n_water: false
        })
        .then((user2) => {
         delete user1[0].hash;
         delete user1[0].accessToken;
         req.session.userInfo = user1[0];
         res.send('/levels');
        })
      })
    } else {
     delete user[0].hash;
     delete user[0].accessToken;
     req.session.userInfo = user[0];
     console.log(user[0]);
     res.send('/day');
    }
   })
 }
})
module.exports = router;
