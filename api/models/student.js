const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    studentName: {
        type: String,
        require: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },

})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;