const express = require("express");
const router = express.Router();

const {
  getStudents,
  getCourses,
} = require("../controllers/masterController");

router.get("/test", (req, res) => {
  res.send("Master Route Working");
});

router.get("/students", getStudents);

router.get("/courses", getCourses);

module.exports = router;