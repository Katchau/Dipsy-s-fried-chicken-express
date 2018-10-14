var express = require('express');
var router = express.Router();
// var createError = require('http-errors');

function errorHandler(x, y) {
    if (x === undefined && y === undefined){
        return "Missing both parameters";
    }
    if (x === undefined){
        return "Missing first required parameter";
    }
    if (y === undefined){
        return "Missing second required parameter";
    }
    if (isNaN(x) && isNaN(y)) {
        return "Both parameters are not numbers";
    }
    if (isNaN(x)) {
        return "The first parameter is not a number";
    }
    if (isNaN(y)) {
        return "The second parameter is not a number";
    }
    return false;
}

router.get('/add', function(req, res) {
    var x = req.query.first === undefined ? undefined : parseFloat(req.query.first);
    var y = req.query.second === undefined ? undefined :parseFloat(req.query.second);
    var errorMsg = errorHandler(x, y);
    if(errorMsg) return res.status(400).send({message:errorMsg});
    var op = x + y;
    res.send({result: op.toFixed(3)});
});

router.get('/sub', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    var errorMsg = errorHandler(x, y);
    if(errorMsg) return res.status(400).send({message:errorMsg});
    var op = x - y;
    res.send({result: op.toFixed(3)});
});

router.get('/div', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    var errorMsg = errorHandler(x, y);
    if(errorMsg) return res.status(400).send({message:errorMsg});
    if (y === 0) {
        res.status(400).send({message: "Division by zero is not allowed"});
        return;
    }
    var op = x / y;
    res.send({result: op.toFixed(3)});
});

router.get('/mul', function(req, res) {
    var x = parseFloat(req.query.first);
    var y = parseFloat(req.query.second);
    var errorMsg = errorHandler(x, y);
    if(errorMsg) return res.status(400).send({message:errorMsg});
    var op = x * y;
    res.send({result: op.toFixed(3)});
});

module.exports = router;