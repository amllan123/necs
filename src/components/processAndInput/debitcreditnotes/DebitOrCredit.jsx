// CashTransaction.js

import React, { useState } from 'react';


const DebitOrCredit = () => {
  const [formData, setFormData] = useState({
    date: '',
    voucherNo: '',
    receiptSent: '',
    debitCredit: '',
    acName: '',
    partyName: '',
    details: '',
  });

  const [tableData, setTableData] = useState([
    {
      sl: 1,
      accountHead: 'Account 1',
      partyName: 'Party 1',
      narration: 'Payment for services',
      amount: 1000,
      balance: 5000,
    },
    // Add more dummy data as needed
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating the tableData state
  };

  return (
    <div className="cash-transaction-container">
      <h2>Bank Transaction</h2>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />

        <label>Voucher No:</label>
        <input
          type="text"
          name="voucherNo"
          value={formData.voucherNo}
          onChange={handleInputChange}
        />

        <label>Receipt/Sent:</label>
        <input
          type="text"
          name="receiptSent"
          value={formData.receiptSent}
          onChange={handleInputChange}
        />

        <label>Debit/Credit:</label>
        <input
          type="text"
          name="debitCredit"
          value={formData.debitCredit}
          onChange={handleInputChange}
        />

        <label>A/C Name:</label>
        <input
          type="text"
          name="acName"
          value={formData.acName}
          onChange={handleInputChange}
        />

        <label>Party Name:</label>
        <input
          type="text"
          name="partyName"
          value={formData.partyName}
          onChange={handleInputChange}
        />

        <label>Details:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleInputChange}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Account Head</th>
            <th>Party Name</th>
            <th>Narration</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.sl}>
              <td>{row.sl}</td>
              <td>{row.accountHead}</td>
              <td>{row.partyName}</td>
              <td>{row.narration}</td>
              <td>{row.amount}</td>
              <td>{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="additional-data">
        <label>Total Balance:</label>
        <span>{/* Display total balance here */}</span>

        <label>Cash Balance:</label>
        <span>{/* Display cash balance here */}</span>
      </div>
    </div>
  );
};

export default DebitOrCredit;
