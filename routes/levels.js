var express = require('express');
var router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
    res.render('levels', {stuff:`<ul id='nav-mobile' class="right hide-on-med-and-down">
<li><a class="logout" href="/">Log Out</a></li>
<li><a href="day">Day</a></li>
<li><a href="activities">Activities</a></li>
<li><a href="cheats">Cheats</a></li>
</ul>
<ul class="side-nav" id="mobile-demo">
<li><a class="logout" href="/">Log Out</a></li>
<li><a href="day">Day</a></li>
<li><a href="activities">Activities</a></li>
<li><a href="cheats">Cheats</a></li>
</ul>`})
});

router.put('/', (req, res, next) => {
    let level = req.body.level
    let points = 0;

    if (level === '1') {
        points = 200
    } else if (level === '2') {
        points = 100
    } else {
        points = 0
    }
    return knex('users')
        .where('users.id', req.session.userInfo.id)
        .update({
            tot_pts: points,
            lvl: level
        }, '*')

    .then(() => {
            res.end();
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;
