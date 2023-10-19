// Import necessary dependencies and styles
import React, { useState } from "react";
import "./memberdetail.scss";
import {

    Branchdata as bdata,
    DepositeSchemeData,
    memberdetail as data
} from "../../../DemoData/index";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Main component definition
const MemberDetails = () => {
    // State variables
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortingColumn, setSortingColumn] = useState(null);
    const [sortingOrder, setSortingOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");

    // Add Form Data

    const [newSerialNo, setNewSerialNo] = useState(null);
    const [newDateOfBirth, setNewDateOfBirth] = useState(null);
    const [newDateOfMembership, setNewDateOfMembership] = useState(null);
    const [newBranch, setNewBranch] = useState(null);
    const [newNameOfMember, setNewNameOfMember] = useState(null);
    const [newDesignation, setNewDesignation] = useState(null);
    const [newMobileNo, setNewMobileNo] = useState(null);
    const [newDepositScheme, setNewDepositScheme] = useState(null);
    const [newAddress, SetNewAddress] = useState(null);
    const [newNominee, SetNewNominee] = useState(null);
    const [newrelationship, SetNewRelationship] = useState(null);
    const [newIntroduceBy, SetNewIntroduceBy] = useState(null);
    const [newIntroduceByAddress, SetNewIntroduceByAddress] = useState(null);
    const [newDateOfConfirmation, SetNewDateOfConfirmation] = useState(null);
    const [newPresentBasicSalary, SetNewPresentBasicSalary] = useState(null);
    const [newSubscription, SetNewSubscription] = useState(null);
    const [newFatherName, SetNewFatherName] = useState(null)

    // Update Form Data
    const [updateSerialNo, setUpdateSerialNo] = useState('');
    const [updateDateOfMembership, setUpdateDateOfMembership] = useState('');
    const [updateDateOfBirth, setUpdateDateOfBirth] = useState('');
    const [updateBranch, setUpdateBranch] = useState('');
    const [updateNameOfMember, setUpdateNameOfMember] = useState('');
    const [updateDesignation, setUpdateDesignation] = useState('');
    const [updateMobileNo, setUpdateMobileNo] = useState('');
    const [updateDepositScheme, setUpdateDepositScheme] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const [updateFatherName, setUpdateFatherName] = useState('');
    const [updateNominee, setUpdateNominee] = useState('');
    const [updateRelationship, setUpdateRelationship] = useState('');
    const [updatePresentBasicSalary, setUpdatePresentBasicSalary] = useState('');
    const [updateSubscription, setUpdateSubscription] = useState('');
    const [updateDateOfConfirmation, setUpdateDateOfConfirmation] = useState('');
    const [updateIntroduceBy, setUpdateIntroduceBy] = useState('');
    const [updateIntroduceByAddress, setUpdateIntroduceByAddress] = useState('');

    // Options for the number of items per page
    const integerOptions = [5, 10, 25, 50, 100];

    // Function to handle adding a new branch
    const handleAddBranch = () => {
        setIsDialogOpen(false);
        // Add logic to handle adding new data
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

    // JSX structure for the component
    return (
        <div className="MemberDetails">
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

                            <th onClick={() => handleSort("srno")}>Serial No</th>
                            <th onClick={() => handleSort("dom")}>
                                Date Of Membership
                            </th>
                            <th onClick={() => handleSort("branch")}>Branch</th>
                            <th onClick={() => handleSort("name")}>Name of Member</th>
                            <th onClick={() => handleSort("designation")}>Designation</th>
                            <th onClick={() => handleSort("mobileno")}>Mobile No</th>
                            <th onClick={() => handleSort("depositscheme")}>
                                Deposit Scheme
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows with data */}
                        {visibleData.map((item) => (
                            <tr key={item.srno}>
                                <td>{item.srno}</td>
                                <td>{item.dom}</td>
                                <td>{item.branch}</td>
                                <td>{item.name}</td>
                                <td>{item.designation}</td>
                                <td>{item.mobileno}</td>
                                <td>{item.depositescheme}</td>
                                <td>
                                    {/* Edit and delete buttons */}
                                    <Tooltip title="Edit and Show">
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

                                                setUpdateSerialNo(item.srno);
                                                setUpdateDateOfMembership(item.dom);
                                                setUpdateBranch(item.branch);
                                                setUpdateNameOfMember(item.name);
                                                setUpdateDesignation(item.designation);
                                                setUpdateMobileNo(item.mobileno);
                                                setUpdateDepositScheme(item.depositescheme);
                                                setUpdateAddress(item.address)
                                                setUpdateFatherName(item.fathername)
                                                setUpdatePresentBasicSalary(item.presentsalary)
                                                setUpdateDateOfBirth(item.dob)
                                                setUpdateNominee(item.nameofnominee)
                                                setUpdateRelationship(item.relationship)
                                                setUpdateIntroduceBy(item.introduceby)
                                                setUpdateIntroduceByAddress(item.introduceplace)
                                                setUpdateSubscription(item.subscription)
                                                setUpdateDateOfConfirmation(item.dateOfConfirmation)
                                                
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
                        <h2>Add Member Details</h2>
                        <div className="dialogForm">
                            {/* New Fields */}
                            <div>
                                <label htmlFor="serialNoInput">Serial No:</label>
                                <input
                                    type="number"
                                    id="serialNoInput"
                                    placeholder="Serial No"
                                    value={newSerialNo}
                                    onChange={(e) => setNewSerialNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="dateOfMembershipInput">
                                    Date Of Membership:
                                </label>
                                <input
                                    type="date"
                                    id="dateOfMembershipInput"
                                    placeholder="Date Of Membership"
                                    value={newDateOfMembership}
                                    onChange={(e) => setNewDateOfMembership(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    placeholder="Date Of Birth"
                                    value={newDateOfBirth}
                                    onChange={(e) => setNewDateOfBirth(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="branchInput">Branch:</label>
                                <select
                                    id="branchInput"
                                    onChange={(e) => setUpdateBranch(e.target.value)}
                                >
                                    {bdata.map((i) => (
                                        <option key={i["Branch Code"]} value={i["Branch Name"]}>
                                            {i["Branch Name"]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="nameOfMemberInput">Name of Member:</label>
                                <input
                                    type="text"
                                    id="nameOfMemberInput"
                                    placeholder="Name of Member"
                                    value={newNameOfMember}
                                    onChange={(e) => setNewNameOfMember(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="designationInput">Designation:</label>
                                <input
                                    type="text"
                                    id="designationInput"
                                    placeholder="Designation"
                                    value={newDesignation}
                                    onChange={(e) => setNewDesignation(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="mobileNoInput">Mobile No:</label>
                                <input
                                    type="text"
                                    id="mobileNoInput"
                                    placeholder="Mobile No"
                                    value={newMobileNo}
                                    onChange={(e) => setNewMobileNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="depositSchemeInput">Deposit Scheme:</label>

                                <select
                                    id="depositSchemeInput"
                                    onChange={(e) => setNewDepositScheme(e.target.value)}
                                >
                                    {DepositeSchemeData.map((i) => (
                                        <option key={i.id} value={i.name}>
                                            {i.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="address">Address:</label>
                                <textarea
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    value={newAddress}
                                    onChange={(e) => SetNewAddress(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="nameOfNominee">Father Name</label>
                                <input
                                    type="text"
                                    id="nameOfFather"
                                    placeholder="Father Name"
                                    value={newFatherName}
                                    onChange={(e) => SetNewFatherName(e.target.value)}
                                />

                                <label htmlFor="nameOfNominee">Name of Nominee:</label>
                                <input
                                    type="text"
                                    id="nameOfNominee"
                                    placeholder="Name of Nominee"
                                    value={newNominee}
                                    onChange={(e) => SetNewNominee(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="relationship"
                                    placeholder="Relationship"
                                    value={newrelationship}
                                    onChange={(e) => SetNewRelationship(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="basicsalary">Present Salary:</label>
                                <input
                                    type="number"
                                    id="basicsalary"
                                    placeholder="Present Salary"
                                    value={newPresentBasicSalary}
                                    onChange={(e) => SetNewPresentBasicSalary(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="subscription">Monthly Subscription:</label>
                                <input
                                    type="number"
                                    id="subscirption"
                                    placeholder="Monthly Subscription"
                                    value={newSubscription}
                                    onChange={(e) => SetNewSubscription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="dateOfConfirmation">Date Of Confirmation:</label>
                                <input
                                    type="date"
                                    id="dateOfConfirmation"
                                    placeholder="Date Of Birth"
                                    value={newDateOfConfirmation}
                                    onChange={(e) => SetNewDateOfConfirmation(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="introduceby">Introduce By :</label>
                                <input
                                    type="text"
                                    id="introduceby"
                                    placeholder="Introduce By"
                                    value={newIntroduceBy}
                                    onChange={(e) => SetNewIntroduceBy(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="Address"
                                    placeholder="Address"
                                    value={newIntroduceByAddress}
                                    onChange={(e) => SetNewIntroduceByAddress(e.target.value)}
                                />

                            </div>
                        </div>

                        <button onClick={handleAddBranch}>Add</button>
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
                        <h2>Edit Member Details</h2>
                        <div className="dialogForm">
                            <div>
                                <label htmlFor="serialNoInput">Serial No:</label>
                                <input
                                    type="number"
                                    id="serialNoInput"
                                    placeholder="Serial No"
                                    value={updateSerialNo}
                                    onChange={(e) => setUpdateSerialNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="dateOfMembershipInput">Date Of Membership:</label>
                                <input
                                    type="date"
                                    id="dateOfMembershipInput"
                                    placeholder="Date Of Membership"
                                    value={updateDateOfMembership}
                                    onChange={(e) => setUpdateDateOfMembership(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    placeholder="Date Of Birth"
                                    value={updateDateOfBirth}
                                    onChange={(e) => setUpdateDateOfBirth(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="branchInput">Branch:</label>
                                <select
                                    id="branchInput"
                                    onChange={(e) => setUpdateBranch(e.target.value)}
                                >
                                    {bdata.map((i) => (
                                        <option key={i["Branch Code"]} value={i["Branch Name"]}>
                                            {i["Branch Name"]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="nameOfMemberInput">Name of Member:</label>
                                <input
                                    type="text"
                                    id="nameOfMemberInput"
                                    placeholder="Name of Member"
                                    value={updateNameOfMember}
                                    onChange={(e) => setUpdateNameOfMember(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="designationInput">Designation:</label>
                                <input
                                    type="text"
                                    id="designationInput"
                                    placeholder="Designation"
                                    value={updateDesignation}
                                    onChange={(e) => setUpdateDesignation(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="mobileNoInput">Mobile No:</label>
                                <input
                                    type="text"
                                    id="mobileNoInput"
                                    placeholder="Mobile No"
                                    value={updateMobileNo}
                                    onChange={(e) => setUpdateMobileNo(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="depositSchemeInput">Deposit Scheme:</label>
                                <select
                                    id="depositSchemeInput"
                                    onChange={(e) => setUpdateDepositScheme(e.target.value)}
                                    value={updateDepositScheme}
                                >
                                    {DepositeSchemeData.map((i) => (
                                        <option key={i.id} value={i.name}>
                                            {i.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="address">Address:</label>
                                <textarea
                                    type="text"
                                    id="address"
                                    placeholder="Address"
                                    value={updateAddress}
                                    onChange={(e) => setUpdateAddress(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="nameOfNominee">Father Name:</label>
                                <input
                                    type="text"
                                    id="nameOfFather"
                                    placeholder="Father Name"
                                    value={updateFatherName}
                                    onChange={(e) => setUpdateFatherName(e.target.value)}
                                />

                                <label htmlFor="nameOfNominee">Name of Nominee:</label>
                                <input
                                    type="text"
                                    id="nameOfNominee"
                                    placeholder="Name of Nominee"
                                    value={updateNominee}
                                    onChange={(e) => setUpdateNominee(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="relationship"
                                    placeholder="Relationship"
                                    value={updateRelationship}
                                    onChange={(e) => setUpdateRelationship(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="basicsalary">Present Salary:</label>
                                <input
                                    type="number"
                                    id="basicsalary"
                                    placeholder="Present Salary"
                                    value={updatePresentBasicSalary}
                                    onChange={(e) => setUpdatePresentBasicSalary(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="subscription">Monthly Subscription:</label>
                                <input
                                    type="number"
                                    id="subscription"
                                    placeholder="Monthly Subscription"
                                    value={updateSubscription}
                                    onChange={(e) => setUpdateSubscription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="dateOfConfirmation">Date Of Confirmation:</label>
                                <input
                                    type="date"
                                    id="dateOfConfirmation"
                                    placeholder="Date Of Confirmation"
                                    value={updateDateOfConfirmation}
                                    onChange={(e) => setUpdateDateOfConfirmation(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="introduceby">Introduce By:</label>
                                <input
                                    type="text"
                                    id="introduceby"
                                    placeholder="Introduce By"
                                    value={updateIntroduceBy}
                                    onChange={(e) => setUpdateIntroduceBy(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="Address"
                                    placeholder="Address"
                                    value={updateIntroduceByAddress}
                                    onChange={(e) => setUpdateIntroduceByAddress(e.target.value)}
                                />
                            </div>






                        </div>
                        <button onClick={handleAddBranch}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export the component
export default MemberDetails;
