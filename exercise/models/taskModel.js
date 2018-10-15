// name	String	required: true	any valid string (must be provided)
// created_date	Date	default: Date.now	valid Date object
// status	String Enum (Array)	default: [‘pending’]	[‘pending’, ‘ongoing’, ‘completed’]
const mongoose = require('mongoose');

const taskSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Task', taskSchema);