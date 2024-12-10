const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://msiekpheng:msiekpheng@cluster0.rughg.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB:", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const Student = require("./models/student");
const Attendance = require("./models/attendance");

// Simplified endpoint to manage a single student
app.post("/student", async (req, res) => {
  try {
    const { studentName, studentId, dateOfBirth, joiningDate } = req.body;

    // Update or create the student
    const student = await Student.findOneAndUpdate(
      { studentId },
      { studentName, dateOfBirth, joiningDate },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Student data updated", student });
  } catch (error) {
    console.log("Error managing student", error);
    res.status(500).json({ message: "Failed to manage student" });
  }
});

// Simplified endpoint to manage attendance for a single student
app.post("/student/attendance", async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    // Update or create attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { studentId, date },
      { status },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Attendance updated", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error managing attendance" });
  }
});