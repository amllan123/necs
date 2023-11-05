// LoanAdjustmentForm.js (React component)
import React, { useState } from "react";
import "./loanadjustment.scss";

const LoanAdjustmentForm = () => {
  // Dummy data for quick reference
  const dummyData = [
    {
      name: "Ram",
      voucherNo: "V123",
      sanctionNo: "S123",
      loanScheme: "xyz",
      principalAdjustment: 1000,
      interestAmount: 200,
      type: "Less",
      debitAccount: "Loan Account",
      creditAccount: "Expense Account",
    },
    {
      name: "Shyam",
      voucherNo: "V124",
      sanctionNo: "S124",
      loanScheme: "abc",
      principalAdjustment: 800,
      interestAmount: 150,
      type: "Less",
      debitAccount: "Expense Account",
      creditAccount: "Loan Account",
    },
    // Add more members as needed
  ];

  // State for form data
  const [formData, setFormData] = useState({
    adjustmentDate: "",
    voucherNo: "",
    memberName: "",
    sanctionNo: "",
    type: "",
    loanScheme: "",
    principalAdjustment: "",
    interestAmount: "",
    debitAccount: "",
    creditAccount: "",
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
        voucherNo: memberData.voucherNo,
        sanctionNo: memberData.sanctionNo,
        type: memberData.type,
        loanScheme: memberData.loanScheme,
        principalAdjustment: memberData.principalAdjustment.toString(),
        interestAmount: memberData.interestAmount.toString(),
        debitAccount: memberData.debitAccount,
        creditAccount: memberData.creditAccount,
      });
    } else {
      // Clear details if member not found
      setFormData({
        ...formData,
        memberName: name,
        voucherNo: "",
        sanctionNo: "",
        type: "",
        loanScheme: "",
        principalAdjustment: "",
        interestAmount: "",
        debitAccount: "",
        creditAccount: "",
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
    <div className="loanAdjustmentFormContainer">
      <h2>Loan Adjustment Form</h2>
      <div className="form-container">
        <div className="column">
          <label htmlFor="adjustmentDate">Adjustment Date:</label>
          <input
            type="date"
            id="adjustmentDate"
            name="adjustmentDate"
            value={formData.adjustmentDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="voucherNo">Voucher No:</label>
          <input
            type="text"
            id="voucherNo"
            name="voucherNo"
            value={formData.voucherNo}
            onChange={handleChange}
            required
          />

          <label htmlFor="memberName">Name of Member:</label>
          <input
            type="text"
            id="memberName"
            name="memberName"
            value={formData.memberName}
            onChange={handleMemberNameChange}
            required
          />

          <label htmlFor="sanctionNo">Sanction No:</label>
          <input
            type="text"
            id="sanctionNo"
            name="sanctionNo"
            value={formData.sanctionNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="column">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
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

          <label htmlFor="principalAdjustment">Principal Adjustment:</label>
          <input
            type="text"
            id="principalAdjustment"
            name="principalAdjustment"
            value={formData.principalAdjustment}
            onChange={handleChange}
            required
          />

          <label htmlFor="interestAmount">Interest Amount:</label>
          <input
            type="text"
            id="interestAmount"
            name="interestAmount"
            value={formData.interestAmount}
            onChange={handleChange}
            required
          />

          <label htmlFor="debitAccount">Debit Account:</label>
          <input
            type="text"
            id="debitAccount"
            name="debitAccount"
            value={formData.debitAccount}
            onChange={handleChange}
            required
          />

          <label htmlFor="creditAccount">Credit Account:</label>
          <input
            type="text"
            id="creditAccount"
            name="creditAccount"
            value={formData.creditAccount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LoanAdjustmentForm;
