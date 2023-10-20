import React, { useState } from "react";
import './sanctionofLoan.scss';

const SanctionOfLoan = () => {
  const [formData, setFormData] = useState({
    searchName: "",
    searchApplicationNo: "",
    date: "",
    applicationNo: "",
    member: "",
    loanScheme: "",
    noOfInstallment: "",
    sanctionAmount: "",
    previousLoan: "",
    previousAmount: "",
    previousInterest: "",
    netAmount: "",
    collectionToStart: "",
    paymentMode: "ECS",
    chequeNo: "",
    paymentDate: "",
    monthlyDeduction: "",
    interest: "",
    cashOrBank: "",
    maxEMI: "",
    maxLoan: "",
  });
  console.log(formData.chequeNo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="sanctioncontainer">
      <div className="topContainer">
        <label htmlFor="searchName">Name:</label>
        <input
          type="text"
          placeholder="Search for Name"
          name="searchName"
          value={formData.searchName}
          onChange={handleChange}
        />

        <label htmlFor="searchApplicationNo">Application No:</label>
        <input
          type="number"
          placeholder="Search of Application No."
          name="searchApplicationNo"
          value={formData.searchApplicationNo}
          onChange={handleChange}
        />
      </div>

      <div className="bottomContainer">
        <div className="bottomTopContainer">
          <label htmlFor="date">
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>

          <label htmlFor="applicationNo">
            Application No:
            <input
              type="number"
              placeholder="Application No."
              name="applicationNo"
              value={formData.applicationNo}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="bottomMidContainer">
          <div className="bottomMidContainerLeft">
            <div className="bottomMidContainerLeftItems">
              <label>Member:</label>
              <input
                type="text"
                placeholder="Member"
                disabled="true"
                name="member"
                value={formData.member}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>Loan Scheme:</label>
              <input
                type="text"
                placeholder="Loan Scheme"
                disabled="true"
                name="loanScheme"
                value={formData.loanScheme}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>No of Installment:</label>
              <input
                type="number"
                placeholder="No Of Installment"
                name="noOfInstallment"
                value={formData.noOfInstallment}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>Sanction Ammount:</label>
              <input
                type="number"
                placeholder="Sanction Ammount"
                name="sanctionAmount"
                value={formData.sanctionAmount}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>Previous Loan:</label>
              <input
                type="text"
                placeholder="Previous Loan"
                name="previousLoan"
                value={formData.previousLoan}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>Previous Amount:</label>
              <input
                type="number"
                placeholder="Previous Amount"
                name="previousAmount"
                value={formData.previousAmount}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>Previous Interest:</label>
              <input
                type="number"
                placeholder="Previous Interest"
                name="previousInterest"
                value={formData.previousInterest}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerLeftItems">
              <label>Net Ammount:</label>
              <input
                type="number"
                placeholder="Net Ammount"
                name="netAmount"
                value={formData.netAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bottomMidContainerRight">
            <div className="bottomMidContainerRightItems">
              <label>Collection To Start:</label>
              <input
                type="date"
                placeholder="Collection To Start"
                name="collectionToStart"
                value={formData.collectionToStart}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>Payment Mode:</label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              >
                <option>ECS</option>
                <option>Cheque</option>
                <option>Cash</option>
              </select>
            </div>
            <div className="bottomMidContainerRightItems">
              <label>Cheque No:</label>
              <input
                type="text"
                placeholder="Cheque No"
                name="chequeNo"
                value={formData.chequeNo}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>Date:</label>
              <input
                type="date"
                placeholder="Date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>Monthly Deduction:</label>
              <input
                type="number"
                placeholder="Monthly Deduction"
                name="monthlyDeduction"
                value={formData.monthlyDeduction}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>Interest:</label>
              <input
                type="number"
                placeholder="Interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>Cash / Bank A/C:</label>
              <input
                type="text"
                placeholder="Cash / Bank A/C"
                name="cashOrBank"
                value={formData.cashOrBank}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>MAX EMI:</label>
              <input
                type="NUMBER"
                placeholder="MAX EMI"
                name="maxEMI"
                value={formData.maxEMI}
                onChange={handleChange}
              />
            </div>
            <div className="bottomMidContainerRightItems">
              <label>MAX Loan:</label>
              <input
                type="number"
                placeholder="MAX Loan"
                name="maxLoan"
                value={formData.maxLoan}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button">
        <button>Sanction The Loan</button>
      </div>
    </div>
  );
};

export default SanctionOfLoan;
