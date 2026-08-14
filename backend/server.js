const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// root route-confirms the server is running
app.get("/", (req, res) => {
    res.send("backend is running with my sql");
});

// GET /students-return all students from mysql
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql,(error, results) => {
        if(error){
            console.error("error getting students:", error);
            return res.status(500).json({error: "failed to get students"});
        }
        res.json(results);
    });
});

// GET / classes-returns all classes from mysql
app.get("/classes",(req, res) => {
    const sql = "SELECT * FROM classes";
    db.query(sql,(error, results) => {
        if(error){
            console.error("error getting classes:", error);
            return res.status(500).json({error: "failed to get classes"});
        }
        res.json(results);
    });
});

//GET/enrollments-return joins data(student name + class name)//
app.get("/enrollments", (req, res) => {
    const sql = "SELECT students.first_name, students.last_name, classes.class_name, classes.teacher_name FROM enrollments JOIN students ON enrollments.student_id = students.id JOIN classes ON enrollments.class_id = classes.id";
    db.query(sql, (error, results) => {
        if(error) {
            console.error("error getting enrollments", error);
            return res.status(500).json({error: "failed to get enrollment"});
        }
        res.json(results);
    });
});

// GET /students/:id- returns one student by id
app.get("/students/:id", (req, res) => {
    const {id} = req.params;
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [id],(error, results) => {
        if(error) {
            console.error("error getting student", error);
            return res.status(500).json({error: "failed to get students"});
        }
        if(results.lenght === 0) {
            return res.status(404).json({error: "students not found"});
        }
        res.json(results[0]);
    });
});

// GET /students/:id/grades- returns grades from one student

app.listen(PORT, () => {
    console.log (`Server running at http://localhost:${PORT}`);
});