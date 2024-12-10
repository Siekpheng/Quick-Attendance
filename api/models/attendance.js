const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    studentName: {
        type: String,
        require: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },

})

const Attendance = mongoose.model('Attendance', studentSchema);

module.exports = Attendance;