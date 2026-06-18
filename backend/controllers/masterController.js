const pool = require("../db");

exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY student_name"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCourses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM courses ORDER BY course_name"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};