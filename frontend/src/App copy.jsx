
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "./components/Header";
import Footer from "./components/Footer";



function App() {
  const [studentName, setStudentName] = useState("");
  const [address, setAddress] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const generateInvoice = () => {
  setShowInvoice(true);
};

  const [invoiceNo] = useState(
    `INV-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`
  );

  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [items, setItems] = useState([
    {
      course: "",
      description: "",
      duration: "",
      price: ""
    }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        course: "",
        description: "",
        duration: "",
        price: ""
      }
    ]);
  };

  const removeRow = (index) => {
    const updated = items.filter(
      (_, i) => i !== index
    );
    setItems(updated);
  };

  const saveInvoice = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/invoices/save",
        {
          invoiceNo,
          studentName,
          address,
          invoiceDate,
          items
        }
      );

      alert("Invoice Saved Successfully");
    } catch (error) {
      console.log(error);
      alert("Save Failed");
    }
  };

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0),
    0
  );

  const downloadPDF = async () => {
  const invoice =
    document.getElementById("invoice-preview");

  const canvas =
    await html2canvas(invoice);

  const imgData =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const width =
    pdf.internal.pageSize.getWidth();

  const height =
    (canvas.height * width) /
    canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    width,
    height
  );

  pdf.save(`${invoiceNo}.pdf`);
};

  return (
    <>
      <Header />
    
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto bg-white rounded shadow p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Student Invoice Generator
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            placeholder="Student Name"
            className="border p-4 rounded"
            value={studentName}
            onChange={(e) =>
              setStudentName(e.target.value)
            }
          />

          <input
            value={invoiceNo}
            readOnly
            className="border p-4 rounded"
          />

          <input
            type="date"
            className="border p-4 rounded"
            value={invoiceDate}
            onChange={(e) =>
              setInvoiceDate(e.target.value)
            }
          />

          <textarea
            placeholder="Address"
            className="border p-4 rounded"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

        </div>

        <table className="w-full mt-6 border">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th>Course</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>

                <td>
                  <input
                    className="border w-full p-2"
                    value={item.course}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "course",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    className="border w-full p-2"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    className="border w-full p-2"
                    value={item.duration}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "duration",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="border w-full p-2"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <button
                    onClick={() =>
                      removeRow(index)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        <h2 className="text-right mt-4 text-xl font-bold">
          Total : ₹ {total}
        </h2>

        <div className="flex gap-4 mt-6">

          <button
            onClick={addRow}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Add Course
          </button>

          <button
  onClick={generateInvoice}
  className="bg-blue-600 text-white px-5 py-2 rounded"
>
  Generate Invoice
</button>

          <button
            onClick={saveInvoice}
            className="bg-green-700 text-white px-5 py-2 rounded"
          >
            Save Invoice
          </button>

          <button
  onClick={downloadPDF}
  className="bg-purple-600 text-white px-5 py-2 rounded"
>
  Download PDF
</button>

        </div>

{showInvoice && (
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

    <h3>Total : ₹{total}</h3>
  </div>
)}

      </div>

    </div>

    < Footer />
    </>
  );
}

export default App;

