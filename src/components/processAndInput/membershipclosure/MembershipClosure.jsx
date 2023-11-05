import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import './membershipClosure.scss';

const ReceiptDeduction = () => {
  // State for form data
  const [formData, setFormData] = useState({
    closureDate: "",
    serialNumber: "",
    memberName: "",
    closureType: "",
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
    // Check if closure date, serial number, member name, and closure type are provided
    if (formData.closureDate && formData.serialNumber && formData.memberName && formData.closureType) {
      // Filter dummy data based on the submitted data
      const filteredData = dummyData.filter(
        (item) =>
          item.closureDate === formData.closureDate &&
          item.serialNumber === formData.serialNumber &&
          item.memberName === formData.memberName &&
          item.closureType === formData.closureType
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
        closureDate: "",
        serialNumber: "",
        memberName: "",
        closureType: "",
      });
    } else {
      // Handle the case when not all form values are provided
      console.log("Please provide all form values");
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      closureDate: "",
      serialNumber: "",
      memberName: "",
      closureType: "",
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
      closureDate: "2023-11-01",
      serialNumber: "12345",
      memberName: "John Doe",
      closureType: "Type1",
      amount: 500,
      srNo: 56487,
    },
    {
      slNo: 2,
      closureDate: "2023-11-01",
      serialNumber: "56789",
      memberName: "Jane Smith",
      closureType: "Type2",
      amount: 700,
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
          ["Sl.", "Particulars", "Amount"],
        ],
        body: tableData.map((row) => [
          row.slNo,
          row.memberName,
          row.amount,
        ]),
      });
      doc.save("table_data.pdf");
    }
  };

  // Copy table data to clipboard
  const handleCopyToClipboard = () => {
    if (tableData.length > 0) {
      const textToCopy = tableData
        .map((row) => `${row.slNo}\t${row.memberName}\t${row.amount}`)
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
          <h2>Membership Closure</h2>

          {/* New fields for closure date, serial number, member name, and closure type */}
          <label htmlFor="closureDate">Closure Date:</label>
          <input
            type="date"
            id="closureDate"
            name="closureDate"
            value={formData.closureDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="serialNumber">Serial Number:</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="memberName">Member Name:</label>
          <input
            type="text"
            id="memberName"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            required
          />

          <label htmlFor="closureType">Closure Type:</label>
          <select
            id="closureType"
            name="closureType"
            value={formData.closureType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Closure Type
            </option>
            <option value="Type1">Type 1</option>
            <option value="Type2">Type 2</option>
            {/* Add more closure types as needed */}
          </select>

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
                <th>Sl.</th>
                <th>Particulars</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.slNo}>
                  <td>{row.slNo}</td>
                  <td>{row.memberName}</td>
                  <td>{row.amount}</td>
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

export default ReceiptDeduction;
