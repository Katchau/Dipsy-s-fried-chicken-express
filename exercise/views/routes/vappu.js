var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gettime', function(req, res) {
    var curDate = new Date();
    var coiso = new Date(2019, 4, 1);
    var diff = coiso - curDate;
    if(diff < 0) diff = 0;
    res.send({seconds: Math.floor(diff/1000)});
});

module.exports = router;