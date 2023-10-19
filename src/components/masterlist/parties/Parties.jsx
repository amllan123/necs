// Import necessary dependencies and styles
import React, { useState } from "react";
import { partiesData as data } from "../../../DemoData/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import "./parties.scss";

// Main component definition
const Parties = () => {
  // State variables
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingColumn, setSortingColumn] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  //Add Form Data

  const [newName, setNewName] = useState(null);
  const [newType, setNewType] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newMobile, setNewMobile] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newChecklist, setNewChecklist] = useState(false);

  //Update Form Data

  const [updateName, setUpdateName] = useState(null);
  const [updateType, setUpdateType] = useState(null);
  const [updateAddress, setUpdateAddress] = useState(null);
  const [updateMobile, setUpdateMobile] = useState(null);
  const [updateEmail, setUpdateEmail] = useState(null);
  const [updateChecklist, setUpdateChecklist] = useState(false);

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

  // JSX structure for the component
  return (
    <div className="agp">
      {/* Top section with heading and total count */}
      <div className="top">
        <span className="heading">Account Groups</span>
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

              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("type")}>Type</th>
              <th onClick={() => handleSort("address")}>Address</th>
              <th onClick={() => handleSort("mobile")}>Mobile</th>
              <th onClick={() => handleSort("email")}>Email</th>
              <th>Checklist</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {visibleData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.address}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>
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
                        setUpdateType(item.type);
                        setUpdateAddress(item.address);
                        setUpdateMobile(item.mobile);
                        setUpdateEmail(item.email);
                        setUpdateChecklist(item.checklist); // Added checkbox state
                      }}
                    >
                      <EditIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    {" "}
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
            <h2>Add Branch</h2>
            <div className="dialogForm">
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Mobile"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <label>
                Checklist
                <input
                  type="checkbox"
                  checked={newChecklist}
                  onChange={() => setNewChecklist(!newChecklist)}
                />
              </label>
            </div>
            <button onClick={handleAddBranch}>Add</button>
          </div>
        </div>
      )}

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
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
              <input
                type="text"
                value={updateType}
                onChange={(e) => setUpdateType(e.target.value)}
              />
              <input
                type="text"
                value={updateAddress}
                onChange={(e) => setUpdateAddress(e.target.value)}
              />
              <input
                type="text"
                value={updateMobile}
                onChange={(e) => setUpdateMobile(e.target.value)}
              />
              <input
                type="text"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
              />
              <label>
                Active
                <input
                  type="checkbox"
                  checked={updateChecklist}
                  onChange={() => setUpdateChecklist(!updateChecklist)}
                />
              </label>
            </div>
            <button onClick={handleAddBranch}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component
export default Parties;
