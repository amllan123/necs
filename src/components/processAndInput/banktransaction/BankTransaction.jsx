// CashTransaction.js

import React, { useState } from 'react';


const BankTransaction = () => {
  const [formData, setFormData] = useState({
    date: '',
    voucherType: '',
    voucherNo: '',
    bankAccount: '',
    chequeNo: '',
    chequeDate: '',
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

        <label>Voucher Type:</label>
        <select
          name="voucherType"
          value={formData.voucherType}
          onChange={handleInputChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>

        <label>Voucher No:</label>
        <input
          type="text"
          name="voucherNo"
          value={formData.voucherNo}
          onChange={handleInputChange}
        />

        <label>Bank A/c:</label>
        <input
          type="text"
          name="bankAccount"
          value={formData.bankAccount}
          onChange={handleInputChange}
        />

        <label>Cheque/DD No:</label>
        <input
          type="text"
          name="chequeNo"
          value={formData.chequeNo}
          onChange={handleInputChange}
        />

        <label>Cheque/DD Date:</label>
        <input
          type="date"
          name="chequeDate"
          value={formData.chequeDate}
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

export default BankTransaction;
