// Import necessary dependencies and styles
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import "./accountgroup.scss";
import axios from "axios";

// Define constant for items per page
const ITEMS_PER_PAGE = 5;

// Main component definition
const AccountGroup = () => {
  // State variables
  const [data,setData] =useState([])
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
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState("");

  //Update Form Data
  const [updateId, setUpdateId] = useState(null);
  const [updateGroupName, setUpdateGroupName] = useState(null);
  const [updateGroupType, setUpdateGroupType] = useState(null);



// Data Fetching and Data Processing

useEffect(() => {
    const getadata=async()=>{

      const res=await axios.get(`${url}/api/accountgroup/all`)
      setData(res.data);
      console.log(res.data);

    }

    getadata()



},[])

  // Function to handle adding a new branch
  const handleAddGroup = async () => {
    const postdata={
      "groupname":newGroupName,
      "grouptype":newGroupType
    }
    const res=await axios.post(`${url}/api/accountgroup/add`,postdata);
    setData((prevdata)=>[...prevdata,res.data.accountGroup
    ])
    console.log(res.data);
    setIsDialogOpen(false);
  }
  const handleUpdateGroup = async () => {
    const postdata = {
      "groupname": updateGroupName,
      "grouptype": updateGroupType,
    };
  
    try {
      await axios.put(`${url}/api/accountgroup/update/${updateId}`, postdata);
  
      // Assuming 'Data' is the array you want to update
      setData((prevData) => {
        const updatedData = prevData.map((item) => {
          if (item._id === updateId) {
            // Update the specific group in the array
            return {
              ...item,
              groupname: updateGroupName,
              grouptype: updateGroupType,
            };
          }
          return item;
        });
  
        return updatedData;
      });
  
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };
  

  const handleDeleteGroup = async(id) => {
    await axios.delete(`${url}/api/accountgroup/delete/${id}`)
    setData((prevData) => prevData.filter((item) => item._id !== id));
    setIsDialogOpen(false);
  };







  // Options for the number of items per page
  const integerOptions = [5, 10, 25, 50, 100];
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
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("groupname")}>Group Name</th>
              <th onClick={() => handleSort("grouptype")}>Group Type</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows with data */}
            {visibleData.map((item,index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item.groupname}</td>
                <td>{item.grouptype}</td>

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
                      setUpdateId(item._id)
                      setUpdateGroupName(item.groupname);
                      setUpdateGroupType(item.grouptype);
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
                      handleDeleteGroup(item._id)
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
                placeholder="Group Name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />

              <input
                type="text"
                value={newGroupType}
                placeholder="Group Type"
                onChange={(e) => setNewGroupType(e.target.value)}
              />
            </div>
            <button onClick={handleAddGroup}>Add</button>
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
            <h2>Edit Group</h2>
            <div className="dialogForm">
            
              <input
                type="text"
                value={updateGroupName}
                onChange={(e) => setUpdateGroupName(e.target.value)}
              />
              <textarea
                value={updateGroupType}
                onChange={(e) => setUpdateGroupType(e.target.value)}
              />
            </div>
            <button onClick={handleUpdateGroup}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the component
export default AccountGroup;
