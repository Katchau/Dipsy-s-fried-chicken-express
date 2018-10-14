var express = require('express');
// const mongoose = require('mongoose');
var router = express.Router();
const Task = require('../models/taskModel');

router.get('/:id', function(req, res) {
    const id = req.params.id;
    Task.findById(id).exec()
        .then(function (task) {
            res.send(task)
        })
        .catch(function (err) {
            res.send({
                message: 'Error at getting task' + err.toString()
            })
        })
});

module.exports = router;