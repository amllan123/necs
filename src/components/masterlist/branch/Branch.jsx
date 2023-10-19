// Import necessary dependencies and styles
import React, { useState } from "react";
import { data } from "../../../DemoData/index";
import "./branch.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Define constant for items per page
const ITEMS_PER_PAGE = 5;

// Main component definition
const Branch = () => {
  // State variables
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingColumn, setSortingColumn] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  //Add Form Data
  const [newBranchId, setNewBranchId] = useState(null);
  const [newBranchName, setNewBranchName] = useState(null);
  const [newBranchAddress, setNewBranchAddress] = useState(null);
  const [newBranchIncharge, setNewBranchIncharge] = useState(null);
  const [newBranchMobile, setNewBranchMobile] = useState(null);

  //Update Form Data
  const [updateBranchId, setUpdateBranchId] = useState(null);
  const [updateBranchName, setUpdateBranchName] = useState(null);
  const [updateBranchAddress, setUpdateBranchAddress] = useState(null);
  const [updateBranchIncharge, setUpdateBranchIncharge] = useState(null);
  const [updateBranchMobile, setUpdateBranchMobile] = useState(null);

  // Options for the number of items per page
  const integerOptions = [5, 10, 25, 50, 100];

  // Function to handle adding a new branch
  const handleAddBranch = () => {
    setIsDialogOpen(false);
  };

  // Function to handle dropdown change for items per page
  const handleDropdownChange = (e) => {
    setSelectedValue(parseInt(e.target.value, 10));
  };

  // Function to handle sorting based on a column
  const handleSort = (column) => {
    if (sortingColumn === column) {
      setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
    } else {
      setSortingColumn(column);
      setSortingOrder("asc");
    }
  };

  // Sorting logic for data
  const sortedData = [...data].sort((a, b) => {
    const columnA = a[sortingColumn];
    const columnB = b[sortingColumn];

    if (typeof columnA === "string" && typeof columnB === "string") {
      // Compare strings
      return sortingOrder === "asc"
        ? columnA.localeCompare(columnB)
        : columnB.localeCompare(columnA);
    } else {
      // Custom comparison for non-strings
      if (sortingOrder === "asc") {
        return columnA < columnB ? -1 : columnA > columnB ? 1 : 0;
      } else {
        return columnB < columnA ? -1 : columnB > columnA ? 1 : 0;
      }
    }
  });

  // Filtering logic for search
  const filteredData = sortedData.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / selectedValue);
  const startIndex = (currentPage - 1) * selectedValue;
  const endIndex = startIndex + selectedValue;

  // Slicing data based on pagination
  const visibleData = filteredData.slice(startIndex, endIndex);

  // Function to generate PDF

  const handleGeneratePdf = () => {
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text("Branch Information Process", 10, 10);

    const columns = [
      "Branch ID",
      "Branch Name",
      "Address",
      "Incharge",
      "Mobile No",
    ];
    const rows = visibleData.map((item) => [
      item["Branch Code"],
      item["Branch Name"],
      item["Address"],
      item["In-Charge"],
      item["Mobile No."],
    ]);

    pdf.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the PDF with a specific file name
    pdf.save("branch_information.pdf");
  };

  // Function to generate Excel
  const handleGenerateExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Branch ID", "Branch Name", "Address", "Incharge", "Mobile No"],
      ...visibleData.map((item) => [
        item["Branch Code"],
        item["Branch Name"],
        item["Address"],
        item["In-Charge"],
        item["Mobile No."],
      ]),
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Branch Information");

    XLSX.writeFile(wb, "branch_information.xlsx");
  };

  // Function to generate CSV
  const handleGenerateCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Branch ID", "Branch Name", "Address", "Incharge", "Mobile No"].join(
        ","
      ) +
      "\n" +
      visibleData
        .map((item) =>
          [
            item["Branch Code"],
            item["Branch Name"],
            item["Address"],
            item["In-Charge"],
            item["Mobile No."],
          ].join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "branch_information.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to copy to clipboard
  const handleCopyToClipboard = () => {
    const clipboardData = visibleData
      .map(
        (item) =>
          `${item["Branch Code"]}, ${item["Branch Name"]}, ${item["Address"]}, ${item["In-Charge"]}, ${item["Mobile No."]}`
      )
      .join("\n");

    navigator.clipboard
      .writeText(clipboardData)
      .then(() => {
        console.log("Data copied to clipboard");
        // You can provide user feedback here if needed
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  // JSX structure for the component
  return (
    <div className="branch">
      {/* Top section with heading and total count */}
      <div className="top">
        <span className="heading">Branch Information Process</span>
        <span className="count">Total No of Data: {data.length}</span>
      </div>

      {/* Dropdown and buttons section */}
      <div className="down">
        <div className="tableNav">
          {/* Dropdown for items per page */}
          <div className="showCounter">
            <label>No Of Data per Page: </label>
            <select value={selectedValue} onChange={handleDropdownChange}>
              {integerOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons for download and add */}
          <div className="downloadButtons">
            <button className="download" onClick={handleGenerateCSV}>CSV</button>
            <button className="download" onClick={handleGenerateExcel}>Excel</button>
            <button className="download" onClick={handleGeneratePdf}>Pdf</button>
            <button className="download" onClick={handleCopyToClipboard}>Copy</button>
            
            <button
              className="download"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Add
            </button>
          </div>

          {/* Search bar */}
          <div className="searchbar">
            <SearchIcon />
            <input
              type="text"
              className="search"
              placeholder="Type to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              {/* Table headers with sorting functionality */}
              <th onClick={() => handleSort("Branch Code")}>Branch ID</th>
              <th onClick={() => handleSort("Branch Name")}>Branch Name</th>
              <th onClick={() => handleSort("Address")}>Address</th>
              <th onClick={() => handleSort("In-Charge")}>Incharge</th>
              <th onClick={() => handleSort("Mobile No.")}>Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {visibleData.map((item) => (
              <tr key={item["Branch Code"]}>
                <td>{item["Branch Code"]}</td>
                <td>{item["Branch Name"]}</td>
                <td>{item["Address"]}</td>
                <td>{item["In-Charge"]}</td>
                <td>{item["Mobile No."]}</td>
                <td>
                  {/* Edit and delete buttons */}
                  <button
                    className="edit"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsEditOpen(true);
                      setUpdateBranchId(item["Branch Code"]);
                      setUpdateBranchName(item["Branch Name"]);
                      setUpdateBranchAddress(item["Address"]);
                      setUpdateBranchIncharge(item["In-Charge"]);
                      setUpdateBranchMobile(item["Mobile No."]);
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="delete"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => {
                      setIsEditOpen(false);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination section */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Dialog for adding a new branch */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <span
              className="close"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              &times;
            </span>
            <h2>Add Branch</h2>
            <div className="dialogForm">
              <input
                type="text"
                placeholder="Branch Code"
                value={newBranchId}
                onChange={(e) => setNewBranchId(e.target.value)}
              />
              <input
                type="text"
                placeholder="Branch Name"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
              />
              <textarea
                value={newBranchAddress}
                placeholder="Branch Address"
                onChange={(e) => setNewBranchAddress(e.target.value)}
              />
              <input
                type="text"
                value={newBranchIncharge}
                placeholder="In Charge"
                onChange={(e) => setNewBranchIncharge(e.target.value)}
              />
              <input
                type="text"
                value={newBranchMobile}
                placeholder="Mobile No"
                onChange={(e) => setNewBranchMobile(e.target.value)}
              />
            </div>
            <button onClick={handleAddBranch}>Add</button>
          </div>
        </div>
      )}

      {/* Dialog for editing a branch */}
      {isEditOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <span
              className="close"
              onClick={() => {
                setIsEditOpen(false);
              }}
            >
              &times;
            </span>
            <h2>Edit Branch</h2>
            <div className="dialogForm">
              <input
                type="text"
                value={updateBranchId}
                onChange={(e) => setUpdateBranchId(e.target.value)}
              />
              <input
                type="text"
                value={updateBranchName}
                onChange={(e) => setUpdateBranchName(e.target.value)}
              />
              <textarea
                value={updateBranchAddress}
                onChange={(e) => setUpdateBranchAddress(e.target.value)}
              />
              <input
                type="text"
                value={updateBranchIncharge}
                onChange={(e) => setUpdateBranchIncharge(e.target.value)}
              />
              <input
                type="text"
                value={updateBranchMobile}
                onChange={(e) => setUpdateBranchMobile(e.target.value)}
              />
            </div>
            <button onClick={handleAddBranch}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component
export default Branch;
