// Import necessary dependencies and styles
import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import axios from "axios";

// Main component definition
const DepositeSchemes = () => {
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

    //Add Form Data

    const [newName, setNewName] = useState("");
    const [newShortName, setNewShortName] = useState("");
    const [newAccountHead, setNewAccountHead] = useState("");

    //Update Form Data
    const [updateObjectId, setUpdateObjectId] = useState("")
    const [updateName, setUpdateName] = useState("");
    const [updateShortName, setUpdateShortName] = useState("");
    const [updateAccountHead, setUpdateAccountHead] = useState("");
    const [ApiAccountHead, ApisetAccountHead] = useState("")
   
    // Options for the number of items per page
    const integerOptions = [5, 10, 25, 50, 100];

    // Data Fetching and Processing
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${url}/api/deposite/all`);

                setData(res.data);
            } catch (error) { }
        };
        const getACHeadData = async () => {
            try {
                const res = await axios.get(`${url}/api/accounthead/all`);
                setAccHeadData(res.data);
                
            } catch (error) { }
        };

        getData();
        getACHeadData();
    }, []);

    
    const handleAddDepositeScheme = async () => {
        const postdata = {
            name: newName,
            shortname: newShortName,
            accounthead: newAccountHead,
        };

        try {
            const res = await axios.post(`${url}/api/deposite/add`, postdata);
            setData((prev) => [...prev, res.data.depositScheme])
        } catch (error) {

        }
        setIsDialogOpen(false);

    };

    const handleUpdateDepositeScheme =async() => {
        const postdata = {
            name: updateName,
            shortname: updateShortName,
            accounthead: updateAccountHead===""?ApiAccountHead:updateAccountHead

        }
        
        try {
            const res=await axios.put(`${url}/api/deposite/update/${updateObjectId}`,postdata);
            const updatedData = res.data;

        // Update the state with the new data
      
        } catch (error) {
            
        }

        

        setIsEditOpen(false);
    };
    const handleDeleteDepositeScheme =async (id) => {
        try {
            await axios.delete(`${url}/api/deposite/delete/${id}`);
        } catch (error) {
            
        }
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
                <span className="heading">Deposite Scheme</span>
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
                            <th onClick={() => handleSort("shortname")}>Shortname</th>
                            <th onClick={() => handleSort("accounthead")}>Account Head</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows with data */}
                        {visibleData.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.shortname}</td>
                                <td>{item.accounthead.accountname}</td>
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
                                                setUpdateObjectId(item._id)
                                                setIsEditOpen(true);
                                                setUpdateName(item.name);
                                                setUpdateShortName(item.shortname);
                                                ApisetAccountHead(item.accounthead._id)

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
                                                handleDeleteDepositeScheme(item._id)
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
                                value={newShortName}
                                onChange={(e) => setNewShortName(e.target.value)}
                            />
                            <label htmlFor="accheadDropdown">Select Account Head</label>
                            <select
                                id="accheadDropdown"
                                onChange={(e) => setNewAccountHead(e.target.value)}
                                value={newAccountHead} // Add this line
                            >
                                <option value="" disabled>
                                    Select an account
                                </option>
                                {accHeadData.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.accountname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleAddDepositeScheme}>Add</button>
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
                                value={updateShortName}
                                onChange={(e) => setUpdateShortName(e.target.value)}
                            />
                            <label htmlFor="accheadDropdown">Select Account Head</label>
                            <select
                                id="accheadDropdown"
                                onChange={(e) => setUpdateAccountHead(e.target.value)}
                                value={updateAccountHead}
                            >
                                <option value="" disabled>
                                    Select an account
                                </option>
                                {accHeadData.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.accountname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleUpdateDepositeScheme}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export the component
export default DepositeSchemes;
