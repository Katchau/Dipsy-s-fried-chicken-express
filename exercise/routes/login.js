var express = require('express');
// const mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth/verifyToken');
const User = require('../models/user');

router.get('/', function (req, res) {
    res.send({
        message: 'Login Page'
    })
});

router.post('/', function (req, res) {
    var email = req.body.logemail;
    var pass = req.body.logpassword;
    if(email === undefined || pass === undefined){
        res.status(400).send({
            message: 'All fields required.'
        });
        return;
    }
    User.findOne({email: email}).exec()
        .then(function (user) {
            if(user === undefined || user === null || !auth.checkPassword(pass, user.password)){
                res.status(401).send({
                    message: 'Wrong email or password.'
                })
            }
            else {
                req.session.token = auth.createToken({id: user._id});
                req.session.userInfo = user;
                res.redirect('/profile');
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(401).send({
                message: 'Wrong email or password.'
            })
        })
});

module.exports = router;
