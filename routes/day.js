var express = require('express');
var router = express.Router();
var knex = require('../knex');
var cookieSession = require('cookie-session');
var total = 0;
var day = 0;
// var mhealth = false;
// var ahealth = false;
// var nhealth = false;
// var mwater = false;
// var awater = false;
// var nwater = false;
var timeOfDay = ['Morning', 'Afternoon', 'Evening'];
var stuffs = `<ul id='nav-mobile' class="right hide-on-med-and-down">
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
        </ul>`;
router.get('/', (req, res, next) => {
 if (req.session.userInfo === undefined) {
  res.redirect('index');
 } else {
  knex('users')
   .innerJoin('day', 'users.id', 'day.user_id')
   .where('users.id', req.session.userInfo.id)
   .then((user) => {
    total = user[0].tot_pts;
    day = user[0].day_pts;
    if (user[0].choice) {
     knex('day')
      .where('user_id', req.session.userInfo.id)
      .orderBy('id', 'desc')
      .limit(1)
      .update({
       choice: false
      })
      .then((user1 => {
       if (user[0].tod === 'Morning') {
        if (user[0].m_health) {
         if (user[0].m_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         }
        } else {
         if (user[0].m_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         }
        }
       } else if (user[0].tod === 'Afternoon') {
        if (user[0].a_health) {
         if (user[0].a_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health">
                                  <span class="lever" checked></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        } else {
         if (user[0].a_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        }
       } else {
        if (user[0].n_health) {
         if (user[0].n_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        } else {
         if (user[0].n_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: user[0].tod,
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        }
       }
      }))
    } else {
     knex('day')
      .where('user_id', req.session.userInfo.id)
      .orderBy('id', 'desc')
      .limit(1)
      .update({
       choice: false
      })
      .then((user1) => {
       if (localTime() === 'Morning') {
        if (user[0].m_health) {
         if (user[0].m_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         }
        } else {
         if (user[0].m_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water" checked>
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="morning">
                      <div >
                      <div class="col s12 m12 l12 ">
                        <h5>Did you eat healthy?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_health">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="col s12 m12 l12">
                        <h5>Did you drink water?</h5>
                        <div class="switch">
                            <label>
                                No
                                <input type="checkbox" class="m_water">
                                <span class="lever"></span>
                                Yes
                            </label>
                        </div>
                      </div>
                    </div>
                  </div>`
          })
         }
        }
       } else if (localTime() === 'Afternoon') {
        if (user[0].a_health) {
         if (user[0].a_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        } else {
         if (user[0].a_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="afternoon">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="a_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        }
       } else {
        if (user[0].n_health) {
         if (user[0].n_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        } else {
         if (user[0].n_water) {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water" checked>
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         } else {
          res.render('day', {
           points: user[0].tot_pts,
           dailyPoints: user[0].day_pts,
           TOD: localTime(),
           stuff: stuffs,
           switches: `<div id="evening">
                        <div>
                        <div class="col s12 m12 l12 ">
                          <h5>Did you eat healthy?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_health">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="col s12 m12 l12">
                          <h5>Did you drink water?</h5>
                          <div class="switch">
                              <label>
                                  No
                                  <input type="checkbox" class="n_water">
                                  <span class="lever"></span>
                                  Yes
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>`
          })
         }
        }
       }
      })
    }
   })
 }
})

router.put('/', (req, res, next) => {
 if (req.body.clicked) {
  if (req.body.morning) {
   knex('day')
    .where('user_id', req.session.userInfo.id)
    .orderBy('id', 'desc')
    .limit(1)
    .update({
     choice: true,
     tod: 'Morning'
    })
    .then((user) => {
     res.send('yah');
    })
  }
  if (req.body.afternoon) {
   knex('day')
    .where('user_id', req.session.userInfo.id)
    .orderBy('id', 'desc')
    .limit(1)
    .update({
     choice: true,
     tod: 'Afternoon'
    })
    .then((user) => {
     res.send('yah');
    })
  }
  if (req.body.evening) {
   knex('day')
    .where('user_id', req.session.userInfo.id)
    .orderBy('id', 'desc')
    .limit(1)
    .update({
     choice: true,
     tod: 'Evening'
    })
    .then((user) => {
     res.send('yah');
    })
  }
 }
 if (req.body.m_health && req.body.value) {
   console.log('hey');
  giveUserPts(req, res, next, true, 'm_health');
 }
 if (req.body.m_health && !req.body.value) {
   console.log('heyhey');
  giveUserPts(req, res, next, false, 'm_health')
 }
 if (req.body.m_water && req.body.value) {
  giveUserPts(req, res, next, true, 'm_water');
 }
 if (req.body.m_water && !req.body.value) {
  giveUserPts(req, res, next, false, 'm_water');
 }
 if (req.body.a_health && req.body.value) {
  giveUserPts(req, res, next, true, 'a_health');
 }
 if (req.body.a_health && !req.body.value) {
  giveUserPts(req, res, next, false, 'a_health');
 }
 if (req.body.a_water && req.body.value) {
  giveUserPts(req, res, next, true, 'a_water');
 }
 if (req.body.a_water && !req.body.value) {
  giveUserPts(req, res, next, false, 'a_water');
 }
 if (req.body.n_health && req.body.value) {
  giveUserPts(req, res, next, true, 'n_health');
 }
 if (req.body.n_health && !req.body.value) {
  giveUserPts(req, res, next, false, 'n_health');
 }
 if (req.body.n_water && req.body.value) {
  giveUserPts(req, res, next, true, 'n_water');
 }
 if (req.body.n_water && !req.body.value) {
   console.log('hey');
  giveUserPts(req, res, next, false, 'n_water');
 }
})

function giveUserPts(req, res, next, value, type) {
  if(value){
    if(type === 'm_health'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        day_pts: day + 25,
        m_health: true
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
    }else if(type === 'm_water'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        day_pts: day + 25,
        m_water: true
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
    }else if(type === 'a_health'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        day_pts: day + 25,
        a_health: true
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
    }else if(type === 'a_water'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        day_pts: day + 25,
        a_water: true
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
    }else if(type === 'n_health'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        day_pts: day + 25,
        n_health: true
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
    }else{
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        day_pts: day + 25,
        n_water: true
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
  }else{
    if(type === 'm_health'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        m_health: false
       }, '*')
       .then((user) => {
        day = user[0].day_pts;
        knex('users')
         .where('id', req.session.userInfo.id)
         .update({
          tot_pts: total
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
    }else if(type === 'm_water'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        m_water: false
       }, '*')
       .then((user) => {
        day = user[0].day_pts;
        knex('users')
         .where('id', req.session.userInfo.id)
         .update({
          tot_pts: total
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
    }else if(type === 'a_health'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        a_health: false
       }, '*')
       .then((user) => {
        day = user[0].day_pts;
        knex('users')
         .where('id', req.session.userInfo.id)
         .update({
          tot_pts: total
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
    }else if(type === 'a_water'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        a_water: false
       }, '*')
       .then((user) => {
        day = user[0].day_pts;
        knex('users')
         .where('id', req.session.userInfo.id)
         .update({
          tot_pts: total
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
    }else if(type === 'n_health'){
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        n_health: false
       }, '*')
       .then((user) => {
        day = user[0].day_pts;
        knex('users')
         .where('id', req.session.userInfo.id)
         .update({
          tot_pts: total
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
    }else{
      knex('day')
       .where('user_id', req.session.userInfo.id)
       .orderBy('id', 'desc')
       .limit(1)
       .update({
        n_water: false
       }, '*')
       .then((user) => {
        day = user[0].day_pts;
        knex('users')
         .where('id', req.session.userInfo.id)
         .update({
          tot_pts: total
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
  }

}
// check current time
function localTime() {
 var timeInMs = Date.now();
 var time = new Date(timeInMs);
 var hours = time.getHours();

 if (hours >= 0 && hours < 11) {
  return timeOfDay[0]
 } else if (hours >= 11 && hours < 14) {
  return timeOfDay[1]
 } else {
  return timeOfDay[2]
 }
};

function update_mHealth(req, res, next) {
 knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
   m_health: req.body.m_health
  })
}

function update_mWater(req, res, next) {
 knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
   m_water: req.body.m_water
  })
}

function update_aHealth(req, res, next) {
 knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
   a_health: req.body.a_health
  })
}

function update_aWater(req, res, next) {
 knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
   a_water: req.body.a_water
  })
}

function update_nHealth(req, res, next) {
 knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
   n_health: req.body.n_health
  })
}

function update_nWater(req, res, next) {
 knex('day')
  .where('user_id', req.session.userInfo.id)
  .orderBy('id', 'desc')
  .limit(1)
  .update({
   n_water: req.body.n_water
  })
}

module.exports = router;
