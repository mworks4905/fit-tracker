var express = require('express');
var router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
    res.render('levels')
});

router.put('/', (req, res, next) => {
    let level = req.body.level
    let points = 0;

    if (level === '1') {
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
