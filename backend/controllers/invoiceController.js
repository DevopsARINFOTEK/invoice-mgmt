const pool = require("../db");

exports.saveInvoice = async (req, res) => {
  try {
    const {
      invoiceNo,
      studentName,
      address,
      invoiceDate,
      items
    } = req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    const invoiceResult = await pool.query(
      `
      INSERT INTO invoices
      (
        invoice_no,
        student_name,
        address,
        invoice_date,
        total_amount
      )
      VALUES($1,$2,$3,$4,$5)
      RETURNING id
      `,
      [
        invoiceNo,
        studentName,
        address,
        invoiceDate,
        totalAmount
      ]
    );

    const invoiceId = invoiceResult.rows[0].id;

    for (const item of items) {
      await pool.query(
        `
        INSERT INTO invoice_items
        (
          invoice_id,
          course,
          description,
          duration,
          price
        )
        VALUES($1,$2,$3,$4,$5)
        `,
        [
          invoiceId,
          item.course,
          item.description,
          item.duration,
          item.price
        ]
      );
    }

    res.status(201).json({
      success: true,
      message: "Invoice Saved Successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};