function InvoicePreview({
  invoiceNo,
  invoiceDate,
  studentName,
  address,
  items,
  total,
}) {
  return (
    <div
      id="invoice-preview"
      className="mt-10 border p-6 bg-white"
    >
      <h2 className="text-2xl font-bold text-center">
        STUDENT INVOICE
      </h2>

      <p>Invoice No: {invoiceNo}</p>
      <p>Date: {invoiceDate}</p>
      <p>Student: {studentName}</p>
      <p>Address: {address}</p>

      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border">Course</th>
            <th className="border">Description</th>
            <th className="border">Duration</th>
            <th className="border">Price</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border">{item.course}</td>
              <td className="border">{item.description}</td>
              <td className="border">{item.duration}</td>
              <td className="border">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-right mt-4 font-bold">
        Total : ₹{total}
      </h3>
    </div>
  );
}

export default InvoicePreview;