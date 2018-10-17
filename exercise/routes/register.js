var express = require('express');
// const mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth/verifyToken');
const User = require('../models/user');

// authentication: https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens ou passport.js
// router.use(function (req, res, next) {
//     var token = req.body.token || req.query.token;
//     if (token !== undefined && token !== '' && token !== null) {
//         try {
//             jwt.verify(token, require(secretPath).secret, function (err, decoded) {
//                 if (err) {
//                     return res.send({success:false, content: 'Failed Token Authentication!'});
//                 }
//                 // req.decoded = decoded;
//                 req.body.userId = decoded.id;
//                 next();
//             });
//         } catch (err) {
//             return res.send({success:false, content: 'Failed Token Authentication!'});
//         }
//     } else return res.send({success:false, content: 'Invalid token!'});
// });

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
            res.status(201).send({
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

// function login(db, info, jwt, sendFunc) {
//     var query = 'SELECT * FROM User WHERE email = ? and password = MD5(?)';
//     db.query(query, [info.email, info.password], function (err, results) {
//         if (err) {
//             sendFunc(err);
//         }
//         if(results[0] === undefined) return sendFunc(results[0]);
//         var obj = {
//             id: results[0].id
//         };
//         var token = jwt.sign(obj, require('../db/connect').secretString, {
//             expiresIn: 60 * 60
//         });
//         return sendFunc({token: token, id: results[0].id, name: results[0].name});
//     })
// }

