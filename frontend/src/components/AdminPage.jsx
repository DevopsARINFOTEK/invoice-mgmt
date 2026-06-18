import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
console.log("AdminPage loaded");


function AdminPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/invoices/list"
      );

      setInvoices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded shadow p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-700">
            Admin Dashboard
          </h1>

          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3">Invoice No</th>
              <th className="border p-3">Student Name</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border p-3">
                    {invoice.invoice_no}
                  </td>

                  <td className="border p-3">
                    {invoice.student_name}
                  </td>

                  <td className="border p-3">
                    {invoice.address}
                  </td>

                  <td className="border p-3">
                    {invoice.invoice_date}
                  </td>

                  <td className="border p-3">
                    ₹ {invoice.total_amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-5"
                >
                  No Invoices Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminPage;