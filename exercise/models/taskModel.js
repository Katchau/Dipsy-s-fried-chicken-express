// name	String	required: true	any valid string (must be provided)
// created_date	Date	default: Date.now	valid Date object
// status	String Enum (Array)	default: [‘pending’]	[‘pending’, ‘ongoing’, ‘completed’]
const mongoose = require('mongoose');

const taskSchema = new Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: [{
        type: String,
        default: 'pending'
    }]
},{_id: false});

module.exports = mongoose.model('Task', taskSchema);