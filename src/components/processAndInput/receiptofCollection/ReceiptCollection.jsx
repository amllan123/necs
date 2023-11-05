import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import './receipt.scss';

const ReciptDeduction = () => {
  // State for form data
  const [formData, setFormData] = useState({
    date: "",
    number: "",
    member: "",
    srNo: "",
  });

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

  // Handle form submission
  const handleSubmit = () => {
    // Check if all required fields are provided
    if (formData.date && formData.number && formData.member && formData.srNo) {
      // Filter dummy data based on the submitted data
      const filteredData = dummyData.filter(
        (item) =>
          item.date === formData.date &&
          item.number === formData.number &&
          item.member === formData.member &&
          item.srNo === formData.srNo
      );

      // Update the table data with the filtered data
      setTableData([...filteredData]);

      // Reset the form data
      setFormData({
        date: "",
        number: "",
        member: "",
        srNo: "",
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
      number: "",
      member: "",
      srNo: "",
    });
    setTableData([]);
  };

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
          ["Sl. No", "Particulars", "Credit Account Head", "Loan No", "Amount"],
        ],
        body: tableData.map((row) => [
          row.slNo,
          row.number,
          row.member,
          row.srNo,
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
        .map(
          (row) =>
            `${row.slNo}\t${row.number}\t${row.member}\t${row.srNo}\t${row.amount}`
        )
        .join("\n");

      navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("Table data copied to clipboard");
      });
    }
  };

  // Dummy data
  const dummyData = [
    {
      slNo: 1,
      date: "2023-11-01",
      number: "123",
      member: "John Doe",
      srNo: "SR001",
      amount: 1000,
    },
    {
      slNo: 2,
      date: "2023-11-02",
      number: "456",
      member: "Jane Doe",
      srNo: "SR002",
      amount: 1500,
    },
    // Add more data as needed
  ];

  return (
    <div className="applicationContainer">
      <div className="CalculationOfInterest">
        <div className="form-column">
          <h2>Receipt Of Collections</h2>

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

          <label htmlFor="number">No.:</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />

          <label htmlFor="member">Member:</label>
          <input
            type="text"
            id="member"
            name="member"
            value={formData.member}
            onChange={handleChange}
            required
          />

          <label htmlFor="srNo">SR. NO.:</label>
          <input
            type="text"
            id="srNo"
            name="srNo"
            value={formData.srNo}
            onChange={handleChange}
            required
          />
          <div className="additionalFields">
            <div className="additionalField">
              Collection Mode :
              <div className="additionalFieldData">{additionalFields.collectionMode}</div>
            </div>
            
            <div className="additionalField">
              Total Ammount :
              <div className="additionalFieldData">{additionalFields.totalAmount}</div>
            </div>
            <div className="additionalField">
            Cheque/DD No:
              <div className="additionalFieldData">{additionalFields.chequeDDNo}</div>
            </div>
            <div className="additionalField">
            Cheque/DD Date :
              <div className="additionalFieldData">{additionalFields.chequeDDDate}</div>
            </div>
            <div className="additionalField">
              Drawn On Bank :
              <div className="additionalFieldData">{additionalFields.drawnOnBank}</div>
            </div>
            <div className="additionalField">
              Debit A/C Head:
              <div className="additionalFieldData">{additionalFields.debitAccountHead}</div>
            </div>
            </div>
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
                <th>Particulars</th>
                <th>Credit Account Head</th>
                <th>Loan No</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.slNo}>
                  <td>{row.slNo}</td>
                  <td>{row.number}</td>
                  <td>{row.member}</td>
                  <td>{row.srNo}</td>
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

export default ReciptDeduction;
