import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoicePreview from "./InvoicePreview";


function InvoiceForm() {
    

  const [studentName, setStudentName] = useState("");
  const [address, setAddress] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  

  const navigate = useNavigate();

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
      price: "",
    },
  ]);


  useEffect(() => {
  loadStudents();
  loadCourses();
}, []);

const loadStudents = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/master/students"
    );

    console.log(res.data); // ADD THIS

    setStudents(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const loadCourses = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/master/courses"
    );

    setCourses(res.data);
  } catch (err) {
    console.log(err);
  }
};


  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };
  const handleCourseSelect = (
  index,
  courseId
) => {
  const selectedCourse =
    courses.find(
      (c) => c.id === Number(courseId)
    );

  const updated = [...items];

  updated[index].course =
    selectedCourse?.course_name || "";

  updated[index].description =
    selectedCourse?.description || "";

  updated[index].duration =
    selectedCourse?.duration || "";

  updated[index].price =
    selectedCourse?.price || "";

  setItems(updated);
};
  
  const addRow = () => {
    setItems([
      ...items,
      {
        course: "",
        description: "",
        duration: "",
        price: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const generateInvoice = () => {
    setShowInvoice(true);
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
          items,
        }
      );

      alert("Invoice Saved Successfully");
    } catch (error) {
      console.log(error);
      alert("Save Failed");
    }
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const downloadPDF = async () => {
    const invoice =
      document.getElementById("invoice-preview");

    if (!invoice) {
      alert("Generate invoice first");
      return;
    }

    const canvas = await html2canvas(invoice);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width =
      pdf.internal.pageSize.getWidth();

    const height =
      (canvas.height * width) / canvas.width;

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
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto bg-white rounded shadow p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-blue-700">
          Student Invoice Generator
        </h1>

        <button
  type="button"
  onClick={() => navigate("/admin")} 
  className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700"
>
  Admin
</button>

      </div>

      {/* Student Details */}
      <div className="grid md:grid-cols-2 gap-6">

        <input
  type="text"
  list="studentList"
  className="border p-4 rounded w-full"
  placeholder="Type Student Name"
  value={studentName}
  onChange={(e) => {
    const value = e.target.value;

    setStudentName(value);

    const selectedStudent = students.find(
      (student) =>
        student.student_name.toLowerCase() ===
        value.toLowerCase()
    );

    if (selectedStudent) {
      setAddress(selectedStudent.address);
    } else {
      setAddress("");
    }
  }}
/>

<datalist id="studentList">
  {students.map((student) => (
    <option
      key={student.id}
      value={student.student_name}
    >
      {student.student_name}
    </option>
  ))}
</datalist>

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
          className="border p-4 rounded bg-gray-100"
          value={address}
          readOnly
        />

      </div>

      {/* Course Table */}
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
                <select
                  className="border w-full p-2"
                  value={item.course}
                  onChange={(e) =>
                    handleCourseSelect(
                      index,
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Course
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  className="border w-full p-2 bg-gray-100"
                  value={item.description}
                  readOnly
                />
              </td>

              <td>
                <input
                  className="border w-full p-2 bg-gray-100"
                  value={item.duration}
                  readOnly
                />
              </td>

              <td>
                <input
                  type="number"
                  className="border w-full p-2 bg-gray-100"
                  value={item.price}
                  readOnly
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
        <InvoicePreview
          invoiceNo={invoiceNo}
          invoiceDate={invoiceDate}
          studentName={studentName}
          address={address}
          items={items}
          total={total}
        />
      )}

    </div>
  </div>
);
}

export default InvoiceForm;