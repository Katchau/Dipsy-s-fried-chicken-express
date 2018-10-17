var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var auth = require('../auth/verifyToken');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var name = req.query.name;
  if (name === null || name === undefined) {
    res.send(createError(404));
  }
  else res.send({message: "Hello " +  name + "!"});
});

router.get('/profile', function (req, res) {
    var userId = auth.verifyToken(req.session.token);
    if(userId){
        res.send({
            message: 'User logged in!',
            username: req.session.userInfo.username,
            email: req.session.userInfo.email,
            auth: true,
            token: req.session.token,
            userId: userId
        })
    }
    else{
        res.send({
            message: 'User logged in!',
            auth: false,
            token: null
        })
    }
});

router.get('/logout', function (req, res) {
    req.session.token = null;
    req.session.userInfo = null;
    res.redirect('/login');
});

module.exports = router;
