var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Task = require('../models/taskModel');

router.post('/', function(req, res) {
    console.log(req.body);
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        created_date: req.body.created_date,
        status: req.body.status
    });
    task.save()
        .then(function (result) {
            res.status(201).send({
                message: 'Task successfully created',
                id: result._id
            })
        })
        .catch(function (err) {
            res.status(500).send({
                message: 'Error at creating task' + err.toString()
            })
        })
});

module.exports = router;