var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express4ect' });
  res.render('todo', { title: 'Express4ect' });
});

module.exports = router;
