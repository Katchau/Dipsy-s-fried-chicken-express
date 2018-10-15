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

router.get('/', function (req, res) {
    Task.find().exec()
        .then(function (tasks) {
            res.send(tasks);
        })
        .catch(function (err) {
            res.send({
                message: 'Error at getting tasks' + err.toString()
            })
        })
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    Task.updateOne({_id: id}, {$set: req.body}).exec()
        .then(function (result) {
            Task.findById(id).exec().then(function (result2) {
                res.send({
                    message: 'Task successfully updated',
                    id: id,
                    name: result2.name,
                    created_date: result2.created_date,
                    status: result2.status
                })
            })
        })
        .catch(function (err) {
            res.send({
                message: 'Error at updating task' + err.toString()
            });
        })
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    Task.remove({_id: id}).exec()
        .then(function (result) {
            res.send({
                message: 'Task successfully deleted',
                id: id
            })
        })
        .catch(function (err) {
            res.send({
                message: 'Error at deleting task' + err.toString()
            });
        })
});

module.exports = router;