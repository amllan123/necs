import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import './recipt.scss';

const ReciptDeduction = () => {
  // State for form data
  const [formData, setFormData] = useState({
    date: "",
    monthOfDeduction: "",
    yearOfDeduction: "",
  });

  // State for additional fields
  const [additionalFields, setAdditionalFields] = useState({
    collectionMode: "",
    totalAmount: "",
    chequeDDNo: "",
    chequeDDDate: "",
    drawnOnBank: "",
    debitAccountHead: "",
  });

  // State for table data
  const [tableData, setTableData] = useState([]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle additional fields changes
  const handleAdditionalFieldsChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFields({ ...additionalFields, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Check if date, month, and year are provided
    if (formData.date && formData.monthOfDeduction && formData.yearOfDeduction) {
      // Filter dummy data based on the submitted data
      const filteredData = dummyData.filter(
        (item) =>
          item.date === formData.date &&
          item.monthOfDeduction === formData.monthOfDeduction &&
          item.yearOfDeduction === formData.yearOfDeduction
      );

      // Calculate total amount from the filtered data
      const totalAmount = filteredData.reduce((total, item) => total + item.amount, 0);

      // Update the table data with the new row and existing data
      setTableData([...filteredData]);

      // Update the additional fields with the calculated total amount
      setAdditionalFields({
        collectionMode: "",  // You might want to update these fields as well
        totalAmount: totalAmount.toString(),
        chequeDDNo: "",
        chequeDDDate: "",
        drawnOnBank: "",
        debitAccountHead: "",
      });

      // Reset the form data
      setFormData({
        date: "",
        monthOfDeduction: "",
        yearOfDeduction: "",
      });
    } else {
      // Handle the case when not all form values are provided
      console.log("Please provide all form values");
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      date: "",
      monthOfDeduction: "",
      yearOfDeduction: "",
    });
    setAdditionalFields({
      collectionMode: "",
      totalAmount: "",
      chequeDDNo: "",
      chequeDDDate: "",
      drawnOnBank: "",
      debitAccountHead: "",
    });
    setTableData([]);
  };

  // Dummy data
  const dummyData = [
    {
      slNo: 1,
      date: "2023-11-01",
      monthOfDeduction: "January",
      yearOfDeduction: "2023",
      amount: 500,
      memberName: "Akash",
      srNo: 56487,
    },
    {
      slNo: 2,
      date: "2023-11-01",
      monthOfDeduction: "January",
      yearOfDeduction: "2023",
      amount: 700,
      memberName: "Akposes",
      srNo: 56488,
    },
    // Add more data as needed
  ];

  // Generate CSV file
  const handleGenerateCSV = () => {
    if (tableData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, "table_data.csv");
    }
  };

  // Generate Excel file
  const handleGenerateExcel = () => {
    if (tableData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, "table_data.xlsx");
    }
  };

  // Generate PDF file
  const handleGeneratePdf = () => {
    if (tableData.length > 0) {
      const doc = new jsPDF();
      doc.autoTable({
        head: [
          ["Sl. No", "Member Name", "SR.NO"],
        ],
        body: tableData.map((row) => [
          row.slNo,
          row.memberName,
          row.srNo,
        ]),
      });
      doc.save("table_data.pdf");
    }
  };

  // Copy table data to clipboard
  const handleCopyToClipboard = () => {
    if (tableData.length > 0) {
      const textToCopy = tableData
        .map((row) => `${row.slNo}\t${row.memberName}\t${row.srNo}`)
        .join("\n");

      navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("Table data copied to clipboard");
      });
    }
  };

  return (
    <div className="applicationContainer">
      <div className="CalculationOfInterest">
        <div className="form-column">
          <h2>Receipt Deduction From Branches</h2>

          {/* Form inputs */}
          <label htmlFor="date">Date of Application:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="monthOfDeduction">Month of Deduction:</label>
          <select
            id="monthOfDeduction"
            name="monthOfDeduction"
            value={formData.monthOfDeduction}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            {/* Add more months as needed */}
          </select>

          <label htmlFor="yearOfDeduction">Year of Deduction:</label>
          <input
            type="text"
            id="yearOfDeduction"
            name="yearOfDeduction"
            value={formData.yearOfDeduction}
            onChange={handleChange}
            required
          />

          {/* Additional fields */}
          <label>Collection Mode:</label>
          <p>{additionalFields.collectionMode}</p>

          <label>Total Amount:</label>
          <p>{additionalFields.totalAmount}</p>

          <label>Cheque/DD No:</label>
          <p>{additionalFields.chequeDDNo}</p>

          <label>Cheque/DD Date:</label>
          <p>{additionalFields.chequeDDDate}</p>

          <label>Drawn On Bank:</label>
          <p>{additionalFields.drawnOnBank}</p>

          <label>Debit A/c Head:</label>
          <p>{additionalFields.debitAccountHead}</p>

          {/* Download buttons */}
          <div className="downloadButtons">
            <button className="download" onClick={handleGenerateCSV}>
              CSV
            </button>
            <button className="download" onClick={handleGenerateExcel}>
              Excel
            </button>
            <button className="download" onClick={handleGeneratePdf}>
              Pdf
            </button>
            <button className="download" onClick={handleCopyToClipboard}>
              Copy
            </button>
            <button
              className="download"
              style={{ backgroundColor: "crimson", color: "aliceblue" }}
              onClick={handleReset}
            >
              RESET
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Member Name</th>
                <th>SR.NO</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.slNo}>
                  <td>{row.slNo}</td>
                  <td>{row.memberName}</td>
                  <td>{row.srNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit button */}
      <div className="center-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReciptDeduction;
