// Import necessary dependencies and styles
import React, { useState } from "react";
import {
    VoucherData as data,
    AccountGroupData as accHeadData,
} from "../../../DemoData/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
// Main component definition
const Voucher = () => {
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
    const [ApiAccountHead, setApiAccountHead] = useState("")

    // Update Form Data
    const [objectId, setObjectId] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateShortName, setUpdateShortName] = useState("");
    const [updateAccountHead, setUpdateAccountHead] = useState("");


    // Options for the number of items per page
    const integerOptions = [5, 10, 25, 50, 100];

    // Data Fetching and Processing
const getData = async () => {
            const res = await axios.get(`${url}/api/voucher/all`);
            console.log(res.data);
            setData(res.data);
        };
    useEffect(() => {
        
        const getAccHeadData = async () => {
            const res = await axios.get(`${url}/api/accounthead/all`);
            setAccHeadData(res.data);

        };
        getData();
        getAccHeadData();
    }, []);

    // Function to handle adding a new branch
    const handleAddVoucher = async () => {
        const postdata={
            name:newName,
            shortname:newShortName,
            accounthead:newAccountHead
        }
        const res = await axios.post(`${url}/api/voucher/add`,postdata);

        getData()
        setIsDialogOpen(false);
    };
    const handleUpdateVoucher = async () => { 
        const postdata={
            name:updateName,
            shortname:updateShortName,
            accounthead:updateAccountHead===""?ApiAccountHead:updateAccountHead
        }
        const res= await  axios.put(`${url}/api/voucher/update/${objectId}`,postdata)
        getData()
    }
    const handleDeleteVoucher = async (id) => { 
        try {
            await axios.delete(`${url}/api/voucher/delete/${id}`);
            setData((prev)=>prev.filter((item)=>item._id !==id));
        } catch (error) {
            
        }
    }

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
                <span className="heading">Voucher Narrations</span>
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

                            <th onClick={() => handleSort("particulars")}>Particulars</th>
                            <th onClick={() => handleSort("name")}>Shortname</th>
                            <th onClick={() => handleSort("name")}>Account Head</th>
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
                                                setIsEditOpen(true);
                                                setUpdateName(item.name);
                                                setUpdateShortName(item.shortname);
                                                setApiAccountHead(item.accounthead._id)
                                                setObjectId(item._id)

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
                                                handleDeleteVoucher(item._id)
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
                        </div>
                        <button onClick={handleAddVoucher}>Add</button>
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
                            ><option value="" disabled>
                                    Select an account
                                </option>
                                {accHeadData.map((i) => (
                                    <option key={i._id} value={i._id}>
                                        {i.accountname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleUpdateVoucher}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export the component
export default Voucher;
