var express = require('express');
// const mongoose = require('mongoose');
var router = express.Router();
const Task = require('../models/taskModel');

router.post('/:id', function(req, res) {
    const task = new Task({
        _id: req.params.id,
        name: req.body.name,
        created_date: req.body.created_date,
        status: req.body.status
    });
    task.save()
        .then(function (result) {
            res.send({
                message: 'Task successfully created',
                id: result._id
            })
        })
        .catch(function (err) {
            res.send({
                message: 'Error at creating task' + err.toString()
            })
        })
});

module.exports = router;