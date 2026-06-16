const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY student_name"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/courses", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM courses ORDER BY course_name"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;