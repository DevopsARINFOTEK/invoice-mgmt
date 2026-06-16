const express = require("express");
const cors = require("cors");
require("dotenv").config();

const invoiceRoutes = require("./routes/invoiceRoutes");
const masterRoutes = require("./routes/masterRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/invoices",
  invoiceRoutes
);
app.use(
  "/api/master",
  masterRoutes
);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});