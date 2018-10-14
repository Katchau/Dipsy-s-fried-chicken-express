var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var name = req.query.name;
  if (name === null || name === undefined) {
    res.send(createError(404));
  }
  else res.send({message: "Hello " +  name + "!"});
});

module.exports = router;
