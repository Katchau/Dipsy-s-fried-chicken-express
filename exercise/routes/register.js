var express = require('express');
// const mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth/verifyToken');
const User = require('../models/user');

router.get('/', function (req, res) {
    res.send({
        message: 'Register User Page'
    })
});

router.post('/', function(req, res) {
    if(req.body.password !== req.body.passwordConf){
        res.status(400).send({
            message: 'Passwords do not match.'
        });
        return;
    }
    var password = auth.hashPassword(req.body.password);
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: password
    });
    user.save()
        .then(function (result) {
            var obj =  {
                id: result._id
            };
            var token = auth.createToken(obj);
            if (!token){
                console.error('Invalid Token');
                res.status(500).send({
                    message: 'Error while registering user.'
                });
                return;
            }
            req.session.token = token;
            req.session.userInfo = result;
            res.status(200).send({
                message: 'User has been successfully registered',
                auth: true,
                token: token
            })
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send({
                message: 'Error while registering user.'
            })
        })
});

module.exports = router;

