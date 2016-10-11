var express = require('express');
var router = express.Router();
const knex = require('../knex');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('cheats')
});

module.exports = router;
