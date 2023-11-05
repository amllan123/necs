import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const SentDeduction= () => {
  const [formData, setFormData] = useState({
    date: "",
    monthOfDeduction: "",
    yearOfDeduction: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
  
      // Add your logic to generate SR.NO based on the filtered data
      const srNo = filteredData.length + 1;
  

  
      // Update the table data with the new row
      setTableData([...filteredData]);
  
      
    } else {
      // Handle the case when not all form values are provided
      console.log("Please provide all form values");
    }
  };
  
  

  const handleReset = () => {
    setFormData({
      date: "",
      monthOfDeduction: "",
      yearOfDeduction: "",
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
      memberName: "Member 1",
      srNo: "001",
    },
    {
      slNo: 2,
      date: "2023-11-02",
      monthOfDeduction: "February",
      yearOfDeduction: "2023",
      memberName: "Member 2",
      srNo: "002",
    },
    {
      slNo: 3,
      date: "2023-11-03",
      monthOfDeduction: "March",
      yearOfDeduction: "2023",
      memberName: "Member 3",
      srNo: "003",
    },
    // Add more data as needed
  ];



  const handleGenerateCSV = () => {
    if (tableData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, "table_data.csv");
    }
  };

  const handleGenerateExcel = () => {
    if (tableData.length > 0) {
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
      XLSX.writeFile(wb, "table_data.xlsx");
    }
  };

  const handleGeneratePdf = () => {
    if (tableData.length > 0) {
      const doc = new jsPDF();
      doc.autoTable({
        head: [["Sl. No", "Member Name", "SR.NO"]],
        body: tableData.map((row) => [row.slNo, row.memberName, row.srNo]),
      });
      doc.save("table_data.pdf");
    }
  };

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
    <>
      <div className="apllicationContainer">
        <div className="CalculationOfInterest">
          <div className="form-column">
            <h2>Sent Deduction To Branches</h2>

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

            {/* Add download buttons */}
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

        <div className="center-button">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default SentDeduction;
