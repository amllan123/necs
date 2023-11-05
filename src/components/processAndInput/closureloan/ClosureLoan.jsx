// ClosureOfLoan.js (React component)
import React, { useState } from "react";
import "./closureOfLoan.scss";

const ClosureOfLoan = () => {
  // Dummy data for quick reference
  const dummyData = [
    { name: "Ram", loansanctionno: 23, loanscheme: "xyz", loanammount: 4500 },
    // Add more members as needed
  ];

  // State for form data
  const [formData, setFormData] = useState({
    memberName: "",
    closureDate: "",
    loanSanctionNo: "",
    loanScheme: "",
    loanAmount: "",
    authorizedBy: "",
  });

  // Handle member name change
  const handleMemberNameChange = (e) => {
    const name = e.target.value;
    const memberData = dummyData.find((data) => data.name === name);

    if (memberData) {
      // Populate data from dummyData if member found
      setFormData({
        ...formData,
        memberName: name,
        loanSanctionNo: memberData.loansanctionno.toString(),
        loanScheme: memberData.loanscheme,
        loanAmount: memberData.loanammount.toString(),
      });
    } else {
      // Clear loan details if member not found
      setFormData({
        ...formData,
        memberName: name,
        loanSanctionNo: "",
        loanScheme: "",
        loanAmount: "",
      });
    }
  };

  // Handle loan sanction number change
  const handleLoanSanctionNoChange = (e) => {
    const loanSanctionNo = e.target.value;
    const memberData = dummyData.find(
      (data) => data.loansanctionno.toString() === loanSanctionNo
    );

    if (memberData) {
      // Populate data from dummyData if loanSanctionNo found
      setFormData({
        ...formData,
        memberName: memberData.name,
        loanSanctionNo: loanSanctionNo,
        loanScheme: memberData.loanscheme,
        loanAmount: memberData.loanammount.toString(),
      });
    } else {
      // Clear member details if loanSanctionNo not found
      setFormData({
        ...formData,
        memberName: "",
        loanSanctionNo: loanSanctionNo,
        loanScheme: "",
        loanAmount: "",
      });
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Perform submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="closureOfLoanContainer">
      <h2>Closure of Loan Application</h2>
      <div className="form-container">
        <label htmlFor="memberName">Name of Member:</label>
        <input
          type="text"
          id="memberName"
          name="memberName"
          value={formData.memberName}
          onChange={handleMemberNameChange}
          required
        />

        <label htmlFor="closureDate">Closure Date:</label>
        <input
          type="date"
          id="closureDate"
          name="closureDate"
          value={formData.closureDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="loanSanctionNo">Loan Sanction No:</label>
        <input
          type="text"
          id="loanSanctionNo"
          name="loanSanctionNo"
          value={formData.loanSanctionNo}
          onChange={handleLoanSanctionNoChange}
          required
        />

        <label htmlFor="loanScheme">Loan Scheme:</label>
        <input
          type="text"
          id="loanScheme"
          name="loanScheme"
          value={formData.loanScheme}
          onChange={handleChange}
          disabled
        />

        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="text"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          disabled
        />

        <label htmlFor="authorizedBy">Authorized By:</label>
        <input
          type="text"
          id="authorizedBy"
          name="authorizedBy"
          value={formData.authorizedBy}
          onChange={handleChange}
          required
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ClosureOfLoan;
