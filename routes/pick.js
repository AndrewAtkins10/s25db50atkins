var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pick', { title: 'Random Pick' });
});

module.exports = router;