// Import necessary dependencies and styles
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";

// Main component definition
const TypeofLoan = () => {
  // State variables
  const url = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [accHeadData, setAccHeadData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingColumn, setSortingColumn] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  // Add Form Data
  const [newName, setNewName] = useState("");
  const [newShortName, setNewShortName] = useState("");
  const [newAccountHead, setNewAccountHead] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newMaxLoan, setNewMaxLoan] = useState("");
  const [newMaxEMI, setNewMaxEMI] = useState("");

  // Update Form Data
  const [updateObjectId, setUpdateObjectId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateShortName, setUpdateShortName] = useState("");
  const [updateAccountHead, setUpdateAccountHead] = useState("");
  const [updateInterest, setUpdateInterest] = useState("");
  const [updateMaxLoan, setUpdateMaxLoan] = useState("");
  const [updateMaxEMI, setUpdateMaxEMI] = useState("");
  const [ApiAccountHead, SetApiAccountHead] = useState()

  // Options for the number of items per page
  const integerOptions = [5, 10, 25, 50, 100];


  // Data fetching and management

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${url}/api/typeofloan/all`)

      setData(res.data);
    }
    const getAccHeadData = async () => {
      const res = await axios.get(`${url}/api/accounthead/all`);
      setAccHeadData(res.data);
    }
    getData()
    getAccHeadData()
  }, [])

  // Function to handle adding a new branch
 // Function to handle adding a new loan
const handleAddLoan = async () => {
  const postdata = {
    name: newName,
    shortname: newShortName,
    accountHead: newAccountHead,
    interest: newInterest,
    maximumloan: newMaxLoan,
    maximumemi: newMaxEMI
  };

const res =  await axios.post(`${url}/api/typeofloan/add`, postdata);

  // Fetch updated data after adding and merge with previous data
   
  setData(prevData => [...prevData, res.data]);

  setIsDialogOpen(false);
};

const handleUpdateLoan = async () => {
  const postdata = {
    name: updateName,
    shortname: updateShortName,
    accountHead: updateAccountHead === "" ? ApiAccountHead : updateAccountHead,
    interest: updateInterest,
    maximumloan: updateMaxLoan,
    maximumemi: updateMaxEMI
  };

  await axios.put(`${url}/api/typeofloan/update/${updateObjectId}`, postdata);

  // Fetch updated data after updating and merge with previous data
  const res = await axios.get(`${url}/api/typeofloan/all`);
  setData(prevData => prevData.map(item => (item._id === updateObjectId ? { ...item, ...postdata } : item)));

  setIsEditOpen(false);
};

const handleDeleteLoan = async (id) => {
  await axios.delete(`${url}/api/typeofloan/delete/${id}`);

  // Filter out the deleted item from previous data
  setData(prevData => prevData.filter(item => item._id !== id));

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
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (typeof value === "number") {
        return value.toString().includes(searchQuery);
      }
      return false; // Ignore other types
    });
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / selectedValue);
  const startIndex = (currentPage - 1) * selectedValue;
  const endIndex = startIndex + selectedValue;

  // Slicing data based on pagination
  const visibleData = filteredData.slice(startIndex, endIndex);

  // Function to generate PDF

  // JSX structure for the component
  return (
    <div className="agp">
      {/* Top section with heading and total count */}
      <div className="top">
        <span className="heading">Type Of Loan</span>
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
            <button className="download">CSV</button>
            <button className="download">Excel</button>
            <button className="download">Pdf</button>
            <button className="download">Copy</button>
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
              <th onClick={() => handleSort("name")}>Loan Name</th>
              <th onClick={() => handleSort("shortname")}>Shortname</th>
              <th onClick={() => handleSort("accountHead")}>Account Head</th>
              <th onClick={() => handleSort("interest")}>Interest Account</th>
              <th onClick={() => handleSort("maximumloan")}>Maximum Loan</th>
              <th onClick={() => handleSort("maximumemi")}>Maximum EMI</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {visibleData.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.shortname}</td>
                <td>{item.accountHead.accountname}</td>
                <td>{item.interest}</td>
                <td>{item.maximumloan}</td>
                <td>{item.maximumemi}</td>
                <td>
                  {/* Edit and delete buttons */}
                  <Tooltip title="Edit">
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
                        setUpdateName(item.name);
                        setUpdateShortName(item.shortname);
                        setUpdateObjectId(item._id)
                        setUpdateInterest(item.interest)
                        setUpdateMaxEMI(item.maximumemi)
                        setUpdateMaxLoan(item.maximumloan)
                        SetApiAccountHead(item.accountHead._id)

                        // Added checkbox state
                      }}
                    >
                      <EditIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="Delete">

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
                        handleDeleteLoan(item._id)
                      }}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </Tooltip>
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
            <h2>Add Loan Type</h2>
            <div className="dialogForm">
              <label htmlFor="nameInput">Name:</label>
              <input
                type="text"
                id="nameInput"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <label htmlFor="shortNameInput">Short Name:</label>
              <input
                type="text"
                id="shortNameInput"
                placeholder="Short Name"
                value={newShortName}
                onChange={(e) => setNewShortName(e.target.value)}
              />

              <label htmlFor="accheadDropdown">Select Account Head:</label>
              <select
                id="accheadDropdown"
                onChange={(e) => setNewAccountHead(e.target.value)}
                value={newAccountHead}
              ><option value="" disabled>
                  Select an account
                </option>
                {accHeadData.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.accountname}
                  </option>
                ))}
              </select>
              {console.log(newAccountHead)}
              <label htmlFor="interestInput">Interest:</label>
              <input
                type="number"
                id="interestInput"
                placeholder="Interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
              />

              <label htmlFor="maxLoanInput">Maximum Loan:</label>
              <input
                type="number"
                id="maxLoanInput"
                placeholder="Maximum Loan"
                value={newMaxLoan}
                onChange={(e) => setNewMaxLoan(e.target.value)}
              />

              <label htmlFor="maxEMIInput">Maximum EMI:</label>
              <input
                type="number"
                id="maxEMIInput"
                placeholder="Maximum EMI"
                value={newMaxEMI}
                onChange={(e) => setNewMaxEMI(e.target.value)}
              />
            </div>

            <button onClick={handleAddLoan}>Add</button>
          </div>
        </div>
      )}

      {/* Dialog for editing an existing branch */}
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
            <h2>Edit Loan Type</h2>
            <div className="dialogForm">
              <label htmlFor="nameInput">Name:</label>
              <input
                type="text"
                id="nameInput"
                placeholder="Name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />

              <label htmlFor="shortNameInput">Short Name:</label>
              <input
                type="text"
                id="shortNameInput"
                placeholder="Short Name"
                value={updateShortName}
                onChange={(e) => setUpdateShortName(e.target.value)}
              />

              <label htmlFor="accheadDropdown">Select Account Head:</label>
              <select
                id="accheadDropdown"
                onChange={(e) => setUpdateAccountHead(e.target.value)}
                value={updateAccountHead}
              ><option value="" disabled>
                  Select an account
                </option>
                {accHeadData.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.accountname}
                  </option>
                ))}
              </select>

              <label htmlFor="interestInput">Interest:</label>
              <input
                type="number"
                id="interestInput"
                placeholder="Interest"
                value={updateInterest}
                onChange={(e) => setUpdateInterest(e.target.value)}
              />

              <label htmlFor="maxLoanInput">Maximum Loan:</label>
              <input
                type="number"
                id="maxLoanInput"
                placeholder="Maximum Loan"
                value={updateMaxLoan}
                onChange={(e) => setUpdateMaxLoan(e.target.value)}
              />

              <label htmlFor="maxEMIInput">Maximum EMI:</label>
              <input
                type="number"
                id="maxEMIInput"
                placeholder="Maximum EMI"
                value={updateMaxEMI}
                onChange={(e) => setUpdateMaxEMI(e.target.value)}
              />
            </div>
            <button onClick={handleUpdateLoan}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component
export default TypeofLoan;
