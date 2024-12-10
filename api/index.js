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

//endpoint to register a employee
app.post("/addStudent", async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      dateOfBirth,
      joiningDate,
    } = req.body;

    //create a new Employee
    const newStudent = new Student({
      studentName,
      studentId,
      dateOfBirth,
      joiningDate,
    });

    await newStudent.save();

    res
      .status(201)
      .json({ message: "Student saved successfully", student: newStudent });
  } catch (error) {
    console.log("Error creating student", error);
    res.status(500).json({ message: "Failed to add an student" });
  }
});

//endpoint to fetch all the employees
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the students" });
  }
});

app.post("/attendance", async (req, res) => {
  try {
    const { studentId, studentName, date, status } = req.body;

    const existingAttendance = await Attendance.findOne({ studentId, date });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new Attendance({
        studentId,
        studentName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting attendance" });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    // Find attendance records for the specified date
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data" });
  }
});

app.get("/attendance-report-all-students", async (req, res) => {
    try {
      const { month, year } = req.query;
  
      console.log("Query parameters:", month, year);
      // Calculate the start and end dates for the selected month and year
      const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
        .startOf("month")
        .toDate();
      const endDate = moment(startDate).endOf("month").toDate();
  
      // Aggregate attendance data for all employees and date range
      const report = await Attendance.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    { $month: { $dateFromString: { dateString: "$date" } } },
                    parseInt(req.query.month),
                  ],
                },
                {
                  $eq: [
                    { $year: { $dateFromString: { dateString: "$date" } } },
                    parseInt(req.query.year),
                  ],
                },
              ],
            },
          },
        },
  
        {
          $group: {
            _id: "$studentId",
            present: {
              $sum: {
                $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
              },
            },
            absent: {
              $sum: {
                $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
              },
            },
          },
        },
        {
          $lookup: {
            from: "students", // Name of the employee collection
            localField: "_id",
            foreignField: "studentId",
            as: "studentDetails",
          },
        },
        {
          $unwind: "$studentDetails", // Unwind the employeeDetails array
        },
        {
          $project: {
            _id: 1,
            present: 1,
            absent: 1,
            name: "$studentDetails.studentName",
            studentId: "$studentDetails.studentId",
          },
        },
      ]);
  
      res.status(200).json({ report });
    } catch (error) {
      console.error("Error generating attendance report:", error);
      res.status(500).json({ message: "Error generating the report" });
    }
  });