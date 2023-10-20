import React, { useState } from "react";
import "./applicationforLoan.scss";

const ApplicationForLoan = () => {
  const [formData, setFormData] = useState({
    applicationNo: "",
    date: "",
    memberName: "",
    depositAmount: "",
    shareAmount: "",
    loanScheme: "",
    loanAmount: "",
    installments: "",
    loanPurpose: "",
    place: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // You can send the data to the server, perform validation, etc.
  };

  return (
    <>
      <div className="apllicationContainer">
        <div className="ApplicationForLoan">
          <div className="form-column">
            <h2>Loan Application Form</h2>

            <label htmlFor="applicationNo">Application Number:</label>
            <input
              type="number"
              id="applicationNo"
              name="applicationNo"
              value={formData.applicationNo}
              onChange={handleChange}
              required
            />

            <label htmlFor="date">Date of Application:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="memberName">Name of the Member:</label>
            <select
              id="memberName"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              required
            >
              <option value="member1">Member 1</option>
              <option value="member2">Member 2</option>
              {/* Add more members as needed */}
            </select>

            <label htmlFor="depositAmount">Deposit Amount:</label>
            <input
              type="number"
              id="depositAmount"
              name="depositAmount"
              value={formData.depositAmount}
              onChange={handleChange}
              required
            />

            <label htmlFor="shareAmount">Share Amount:</label>
            <input
              type="number"
              id="shareAmount"
              name="shareAmount"
              value={formData.shareAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-column">
            <label htmlFor="loanScheme">Loan Scheme:</label>
            <select
              id="loanScheme"
              name="loanScheme"
              value={formData.loanScheme}
              onChange={handleChange}
              required
            >
              <option value="scheme1">Scheme 1</option>
              <option value="scheme2">Scheme 2</option>
              {/* Add more loan schemes as needed */}
            </select>

            <label htmlFor="loanAmount">Loan Amount:</label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />

            <label htmlFor="installments">Number of Installments:</label>
            <input
              type="number"
              id="installments"
              name="installments"
              value={formData.installments}
              onChange={handleChange}
              required
            />

            <label htmlFor="loanPurpose">Purpose of Taking Loan:</label>
            <textarea
              id="loanPurpose"
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>

            <label htmlFor="place">Place:</label>
            <input
              type="text"
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="center-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      </div>
    </>
  );
};

export default ApplicationForLoan;
