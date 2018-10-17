var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var auth = require('../auth/verifyToken');
var path = require('path');
var filePath = path.join(__dirname, '..', 'files');
var download = require('download-file');
const latex = require('node-latex');
const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


/* GET home page. */
router.get('/', function(req, res) {
    var url = req.query.url;
    console.log(url);
    var options = {
        directory: filePath,
        filename: "sample.tex"
    };
    download(url, options, function(err){
        if (err) {
            console.error(err);
            res.send({status: 'failure'})
            return;
        }

        const input = fs.createReadStream(filePath + '/sample.tex');
        const output = fs.createWriteStream(filePath + '/final.pdf');
        const pdf = latex(input);

        pdf.pipe(output);
        pdf.on('error', function (err) {
            console.error(err);
            return res.send({status: 'failure'});
        });
        pdf.on('finish', err => res.send({status: 'success'}));
    })
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
