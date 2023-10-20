import React, { useState } from "react";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import DatasetIcon from "@mui/icons-material/Dataset";
import GridOnIcon from "@mui/icons-material/GridOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  const handleDropdownClick = (dropdownNumber) => {
    setShowDropdown((prev) =>
      prev === dropdownNumber ? null : dropdownNumber
    );
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">New India Insurance</span>
      </div>
      <hr />
      <div className="bottom">
        <ul className="menu">
          {/* Master List */}
          <li className="menuItem">
            <div
              className="menuItemName"
              onClick={() => handleDropdownClick(1)}
            >
              <HomeIcon fontSize={"25px"} />
              <span>Master List</span>
              {(showDropdown !== 1 || showDropdown === null) && (
                <ArrowDropDownIcon />
              )}
              {showDropdown === 1 && <ArrowDropUpIcon />}
            </div>
            <ul
              className={`DropdownMenuList ${showDropdown === 1 ? "show" : ""}`}
            >
              <li className="DropdownMenuListData">
                <Link to="/admin/branch">Branch</Link>
              </li>
              <li className="DropdownMenuListData"><Link to="/admin/agp">Account Groups</Link></li>
              <li className="DropdownMenuListData"><Link to="/admin/ahd">Account Heads</Link></li>
              <li className="DropdownMenuListData"><Link to="/admin/parties">Parties</Link></li>
              <li className="DropdownMenuListData"><Link to="/admin/dpschm">Deposite Schemes</Link></li>
              <li className="DropdownMenuListData"><Link to="/admin/typeofloan">Type of Loans</Link></li>
              <li className="DropdownMenuListData"><Link to="/admin/voucher">Voucher Narrations</Link></li>
              {/* Add more items as needed */}
            </ul>
          </li>

          {/* Processes and input */}
          <li className="menuItem">
            <div
              className="menuItemName"
              onClick={() => handleDropdownClick(2)}
            >
              <NoteAltIcon fontSize={"25px"} />
              <span>Processes/Inputs</span>
              {(showDropdown !== 2 || showDropdown === null) && (
                <ArrowDropDownIcon />
              )}
              {showDropdown === 2 && <ArrowDropUpIcon />}
            </div>
            <ul
              className={`DropdownMenuList ${showDropdown === 2 ? "show" : ""}`}
            >
              <div className="DropdownMenuListData"><Link to="/admin/memberdetail">Member Details</Link></div>
              <li className="DropdownMenuListData"><Link to="/admin/applicationforloan">Application for Loan</Link></li>
              <li className="DropdownMenuListData"><Link to='/admin/sanctionofloan'>Sanction Of Loan</Link></li>
              <li className="DropdownMenuListData">Calculation of Interest</li>
              <li className="DropdownMenuListData">
                Sent Deduction to Branches
              </li>
              <li className="DropdownMenuListData">
                Receipt Deduction from Branches
              </li>
              <li className="DropdownMenuListData">Receipt Of Collection</li>
              <li className="DropdownMenuListData">Closure Of Loan</li>
              <li className="DropdownMenuListData">Deposit Adjustmet</li>
              <li className="DropdownMenuListData">Loan adjustment</li>
              <li className="DropdownMenuListData">Membership Closure</li>
              <li className="DropdownMenuListData">Cash Transaction</li>
              <li className="DropdownMenuListData">Bank Transaction</li>
              <li className="DropdownMenuListData">Journal Transaction</li>
              <li className="DropdownMenuListData">Debit /Credit Notes</li>
              <li className="DropdownMenuListData">Bulk SMS</li>

              {/* Add more items as needed */}
            </ul>
          </li>

          {/* ----------------Reports----------------- */}
          <li className="menuItem">
            <div
              className="menuItemName"
              onClick={() => handleDropdownClick(3)}
            >
              <DatasetIcon fontSize={"25px"} />
              <span>Reports</span>
              {(showDropdown !== 3 || showDropdown === null) && (
                <ArrowDropDownIcon />
              )}
              {showDropdown === 3 && <ArrowDropUpIcon />}
            </div>
            <ul
              className={`DropdownMenuList ${showDropdown === 3 ? "show" : ""}`}
            >
              <div className="DropdownMenuListData">
                Deposit Scheme Wise Members
              </div>
              <li className="DropdownMenuListData">Loan Type Members</li>
              <li className="DropdownMenuListData">Loan Register</li>
              <li className="DropdownMenuListData">Premium Register</li>
              <li className="DropdownMenuListData">Receipt Register</li>
              <li className="DropdownMenuListData">
                Debit /Credit Notes Register
              </li>
              <li className="DropdownMenuListData">Members Deposit Sheet</li>
              <li className="DropdownMenuListData">
                Membership Closure Register
              </li>

              {/* Add more items as needed */}
            </ul>
          </li>
          {/* ------------ Book Of accounts------------------*/}
          <li className="menuItem">
            <div
              className="menuItemName"
              onClick={() => handleDropdownClick(4)}
            >
              <GridOnIcon fontSize={"25px"} />
              <span>Book of Accounts</span>
              {(showDropdown !== 4 || showDropdown === null) && (
                <ArrowDropDownIcon />
              )}
              {showDropdown === 4 && <ArrowDropUpIcon />}
            </div>
            <ul
              className={`DropdownMenuList ${showDropdown === 4 ? "show" : ""}`}
            >
              <li className="DropdownMenuListData">Cash Book</li>
              <li className="DropdownMenuListData">Bank Book</li>
              <li className="DropdownMenuListData">Journak Register</li>
              <li className="DropdownMenuListData">Party Ledger</li>
              <li className="DropdownMenuListData">Account Ledger </li>
              <li className="DropdownMenuListData">Trial Balance</li>
              <li className="DropdownMenuListData">Profit/Loss Account</li>
              <li className="DropdownMenuListData">Balance Sheet</li>

              {/* Add more items as needed */}
            </ul>
          </li>
          {/*-------------------  MIS Reports------------------------- */}
          <li className="menuItem">
            <div
              className="menuItemName"
              onClick={() => handleDropdownClick(5)}
            >
              <BarChartIcon fontSize={"25px"} />
              <span>MIS Reports</span>
              {(showDropdown !== 5 || showDropdown === null) && (
                <ArrowDropDownIcon />
              )}
              {showDropdown === 5 && <ArrowDropUpIcon />}
            </div>
            <ul
              className={`DropdownMenuList ${showDropdown === 5 ? "show" : ""}`}
            >
              <li className="DropdownMenuListData">Members Deposit Ledger</li>
              <li className="DropdownMenuListData">Members Loan Ledger</li>
              <li className="DropdownMenuListData">
                Collection Due List Of Deposits
              </li>
              <li className="DropdownMenuListData">
                Collection Due List Of Loans
              </li>
              <li className="DropdownMenuListData">Deposit Defaulter List</li>
              <li className="DropdownMenuListData">Loan Defaulter List</li>
              <li className="DropdownMenuListData">
                Closing Balance Of Parties
              </li>
              <li className="DropdownMenuListData">Member Wise Outstanding</li>
              <li className="DropdownMenuListData">Branch Wise Deductions</li>
              <li className="DropdownMenuListData">Transaction Summary</li>
            </ul>
          </li>

          {/*-------------------------Utilities------------------------------------ */}
          <li className="menuItem">
            <div
              className="menuItemName"
              onClick={() => handleDropdownClick(6)}
            >
              <BarChartIcon fontSize={"25px"} />
              <span>Utilities</span>
              {(showDropdown !== 6 || showDropdown === null) && (
                <ArrowDropDownIcon />
              )}
              {showDropdown === 6 && <ArrowDropUpIcon />}
            </div>
            <ul
              className={`DropdownMenuList ${showDropdown === 6 ? "show" : ""}`}
            >
              <li className="DropdownMenuListData">Accounts OB</li>
              <li className="DropdownMenuListData">Deposits OB</li>
              <li className="DropdownMenuListData">Loan OB</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
