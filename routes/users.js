var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/easteregg', function(req, res, next) {
  res.render('easteregg', { emotion: 'cool' });
});

module.exports = router;
