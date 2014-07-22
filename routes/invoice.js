var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('invoice', { title: 'Express4ect' });
});

module.exports = router;
