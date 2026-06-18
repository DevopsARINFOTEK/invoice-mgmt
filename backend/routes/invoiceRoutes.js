const express = require("express");
const router = express.Router();

console.log("invoiceRoutes loaded");
const {
  saveInvoice,
  getInvoices,
} = require("../controllers/invoiceController");

router.post("/save", saveInvoice);

router.get("/list", getInvoices);

module.exports = router;