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
    db,query(mysql,(error, results) => {
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