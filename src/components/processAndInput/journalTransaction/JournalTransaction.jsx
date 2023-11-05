

import React, { useState } from 'react';


const JournalTransaction = () => {
  const [formData, setFormData] = useState({
    date: '',
    voucherNo: '',
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
      <h2>Journal Transaction</h2>

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

export default JournalTransaction;
