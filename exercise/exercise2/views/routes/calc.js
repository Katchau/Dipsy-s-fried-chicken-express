var express = require('express');
var router = express.Router();
// var createError = require('http-errors');

function errorHandler(x, y, res) {
    res.status(400);
    if (x === undefined && y === undefined){
        res.send({message: "Missing both parameters"});
        return true;
    }
    if (x === undefined){
        res.send({message: "Missing first required parameter"});
        return true;
    }
    if (y === undefined){
        res.send({message: "Missing second required parameter"});
        return true;
    }
    if (isNaN(x) && isNaN(y)) {
        res.send({message: "Both parameters are not numbers"});
        return true;
    }
    if (isNaN(x)) {
        res.send({message: "The first parameter is not a number"});
        return true;
    }
    if (isNaN(y)) {
        res.send({message: "The second parameter is not a number"});
        return true;
    }
    return false;
}

router.get('/add', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    console.log(typeof y);
    if(errorHandler(x, y, res))return;
    var op = x + y;
    res.send({result: op.toFixed(3)});
});

router.get('/sub', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    if(errorHandler(x, y, res))return;
    var op = x - y;
    res.send({result: op.toFixed(3)});
});

router.get('/div', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    if(errorHandler(x, y, res))return;
    if (y === 0) {
        res.send({message: "Division by zero is not allowed"});
        return;
    }
    var op = x / y;
    res.send({result: op.toFixed(3)});
});

router.get('/mul', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    if(errorHandler(x, y, res))return;
    var op = x * y;
    res.send({result: op.toFixed(3)});
});

module.exports = router;