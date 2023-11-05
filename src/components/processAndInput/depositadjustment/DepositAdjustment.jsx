// AdjustmentForm.js (React component)
import React, { useState } from "react";
import "./depositAdjustment.scss";

const AdjustmentForm = () => {
  // Dummy data for quick reference
  const dummyData = [
    {
      name: "Ram",
      voucherNo: "V123",
      depositScheme: "xyz",
      adjustmentAmount: 500,
      type: "Credit",
      debitAccount: "Savings Account",
      creditAccount: "Expense Account",
    },
    {
      name: "Shyam",
      voucherNo: "V124",
      depositScheme: "abc",
      adjustmentAmount: 700,
      type: "Debit",
      debitAccount: "Expense Account",
      creditAccount: "Savings Account",
    },
    // Add more members as needed
  ];

  // State for form data
  const [formData, setFormData] = useState({
    adjustmentDate: "",
    voucherNo: "",
    memberName: "",
    depositScheme: "",
    adjustmentAmount: "",
    type: "",
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
        depositScheme: memberData.depositScheme,
        adjustmentAmount: memberData.adjustmentAmount.toString(),
        type: memberData.type,
        debitAccount: memberData.debitAccount,
        creditAccount: memberData.creditAccount,
      });
    } else {
      // Clear details if member not found
      setFormData({
        ...formData,
        memberName: name,
        voucherNo: "",
        depositScheme: "",
        adjustmentAmount: "",
        type: "",
        debitAccount: "",
        creditAccount: "",
      });
    }
  };

  // Handle voucher number change
  const handleVoucherNoChange = (e) => {
    const voucherNo = e.target.value;
    const memberData = dummyData.find((data) => data.voucherNo === voucherNo);

    if (memberData) {
      // Populate data from dummyData if voucher number found
      setFormData({
        ...formData,
        memberName: memberData.name,
        voucherNo: voucherNo,
        depositScheme: memberData.depositScheme,
        adjustmentAmount: memberData.adjustmentAmount.toString(),
        type: memberData.type,
        debitAccount: memberData.debitAccount,
        creditAccount: memberData.creditAccount,
      });
    } else {
      // Clear details if voucher number not found
      setFormData({
        ...formData,
        memberName: "",
        voucherNo: voucherNo,
        depositScheme: "",
        adjustmentAmount: "",
        type: "",
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
    <div className="adjustmentFormContainer">
      <h2>Adjustment Form</h2>
      <div className="form-container">
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
          onChange={handleVoucherNoChange}
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

        <label htmlFor="depositScheme">Deposit Scheme:</label>
        <input
          type="text"
          id="depositScheme"
          name="depositScheme"
          value={formData.depositScheme}
          onChange={handleChange}
          disabled
        />

        <label htmlFor="adjustmentAmount">Adjustment Amount:</label>
        <input
          type="text"
          id="adjustmentAmount"
          name="adjustmentAmount"
          value={formData.adjustmentAmount}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
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

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AdjustmentForm;
