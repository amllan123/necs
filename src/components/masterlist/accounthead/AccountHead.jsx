//Import necessary dependencies and styles
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import "./accounthead.scss";
import axios from "axios";

// Define constant for items per page
const ITEMS_PER_PAGE = 5;

// Main component definition
const AccountHead = () => {
  // State variables
  const [data, setData] = useState([]);
  const [accountgroupData, setAccountgroupData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingColumn, setSortingColumn] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const url = process.env.REACT_APP_API_URL;

  //Add Form Data
  const [newId, setNewId] = useState("");
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] = useState("");
  const [newAccountGroup, setNewAccountGroup] = useState("");

  //Update Form Data
  // Update Form Data
const [updateId, setUpdateId] = useState("");
const [updateAccountName, setUpdateAccountName] = useState("");
const [updateAccountType, setUpdateAccountType] = useState("");
const [updateAccountGroup, setUpdateAccountGroup] = useState(""); // Initialize with an empty string

  // Options for the number of items per page
  const integerOptions = [5, 10, 25, 50, 100];

  // Data fetcher and Processing
  // Data fetcher and Processing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/accounthead/all`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAccountGroup = async () => {
      try {
        const res = await axios.get(`${url}/api/accountgroup/all`);
        setAccountgroupData(res.data);

      } catch (error) {
        console.error("Error fetching account group data:", error);
      }
    };

    fetchData();
    fetchAccountGroup();

    // Since there are no dependencies, there is no need for a cleanup function or dependencies array.
  }, []);

  // Function to handle adding a new branch
  const handleAddACHEAD = async () => {
    const postdata = {
      accountname: newAccountName,
      accounttype: newAccountType,
      accountgroup: newAccountGroup,
    };
    try {
      const res = await axios.post(`${url}/api/accounthead/add`, postdata);
      setData((prev) => [...prev, res.data.accountHead])
    } catch (error) {
      console.log(error);
    }

    console.log(postdata);

    setIsDialogOpen(false);
  };
  const handleUpdateACHEAD = async () => {
    const postdata = {
      accountname: updateAccountName,
      accountgroup: updateAccountGroup,
      accounttype: updateAccountType
    }
    try {
      const res = await axios.put(`${url}/api/accounthead/update/${updateId}`, postdata)

    } catch (error) {
      console.log(error);
    }


    setIsEditOpen(false);
  };
  const handleDeleteACHEAD = async (id) => {
    await axios.delete(`${url}/api/accounthead/delete/${id}`);
    setData((prev) => prev.filter((item) => item._id !== id))

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
              <th onClick={() => handleSort("ID")}>ID</th>
              <th onClick={() => handleSort("accountname")}>Account Name</th>
              <th onClick={() => handleSort("accounttype")}>Account Type</th>
              <th onClick={() => handleSort("accountgroup")}>Account Group</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {visibleData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.accountname}</td>
                <td>{item.accounttype}</td>
                <td>{item.accountgroup.groupname}</td>
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
                      setUpdateId(item._id);
                      setUpdateAccountName(item.accountname);
                      setUpdateAccountType(item.accounttype);
                      
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
                      handleDeleteACHEAD(item._id);
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
            <h2>Add Account Head</h2>
            <div className="dialogForm">
              <input
                type="text"
                placeholder="Account Name"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
              <textarea
                value={newAccountType}
                placeholder="Account Type"
                onChange={(e) => setNewAccountType(e.target.value)}
              />
              <select
                name=""
                id=""
                onChange={(e) => {
                  const selectedOption = accountgroupData.find(
                    (group) => group.groupname === e.target.value
                  );
                  setNewAccountGroup(
                    selectedOption ? selectedOption._id : null
                  );
                }}
                value={newAccountGroup}
              >
                <option value="" disabled>
                  Select an account
                </option>
                {accountgroupData.map((i) => (
                  <option key={i._id} value={i.groupname}>
                    {i.groupname}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleAddACHEAD}>Add</button>
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
            <h2>Edit Account Head</h2>
            <div className="dialogForm">
              <input
                type="text"
                value={updateAccountName}
                onChange={(e) => setUpdateAccountName(e.target.value)}
              />
              <textarea
                value={updateAccountType}
                onChange={(e) => setUpdateAccountType(e.target.value)}
              />
              <select
                name=""
                id=""
                onChange={(e) => {
                  setUpdateAccountGroup(e.target.value)}}
                value={updateAccountGroup}
              >
                <option value="" disabled>
                  Select an account
                </option>
                {accountgroupData.map((i) => (
                  <option key={i._id} value={i._id}> {/* Change value to i._id */}
                    {i.groupname}
                  </option>
                ))}
              </select>

            </div>
            <button onClick={handleUpdateACHEAD}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component
export default AccountHead;
