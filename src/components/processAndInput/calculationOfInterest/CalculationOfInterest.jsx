import React, { useState } from "react";
import "./calcofinterest.scss";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
const CalculationOfInterest = () => {
    const [formData, setFormData] = useState({
        date: "",
        voucher: "",
        depositScheme: "",
    });

    const [tableData, setTableData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Filter dummy data based on selected date, voucher, and deposit scheme
        const filteredData = dummyData.filter((item) => {
            return (
                item.date === formData.date &&
                item.voucher === formData.voucher &&
                item.depositScheme === formData.depositScheme
            );
        });

        setTableData(filteredData);
    };

    // Dummy data
    const dummyData = [
        {
            slNo: 1,
            date: "2023-11-01",
            voucher: "001",
            depositScheme: "scheme1",
            memberName: "Member 1",
            totalDeposits: 1000,
            interest: 50,
        },
        {
            slNo: 2,
            date: "2023-11-01",
            voucher: "002",
            depositScheme: "scheme2",
            memberName: "Member 2",
            totalDeposits: 1500,
            interest: 75,
        },
        {
            slNo: 3,
            date: "2023-11-02",
            voucher: "003",
            depositScheme: "scheme1",
            memberName: "Member 1",
            totalDeposits: 1200,
            interest: 60,
        },
        // Add more data as needed
    ];

    const handleGenerateCSV = () => {
        if (tableData.length > 0) {
            const ws = XLSX.utils.json_to_sheet(tableData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
            XLSX.writeFile(wb, "table_data.csv");
        }
    };

    const handleGenerateExcel = () => {
        if (tableData.length > 0) {
            const ws = XLSX.utils.json_to_sheet(tableData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
            XLSX.writeFile(wb, "table_data.xlsx");
        }
    };

    const handleGeneratePdf = () => {
        if (tableData.length > 0) {
            const doc = new jsPDF();
            doc.autoTable({
                head: [["Sl. No", "Name of the Member", "Total Deposits", "Interest"]],
                body: tableData.map((row) => [
                    row.slNo,
                    row.memberName,
                    row.totalDeposits,
                    row.interest,
                ]),
            });
            doc.save("table_data.pdf");
        }
    };

    const handleCopyToClipboard = () => {
        if (tableData.length > 0) {
            const textToCopy = tableData
                .map(
                    (row) =>
                        `${row.slNo}\t${row.memberName}\t${row.totalDeposits}\t${row.interest}`
                )
                .join("\n");

            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log("Table data copied to clipboard");
            });
        }
    };

    const handleReset = () => {
        setFormData({
            date: "",
            voucher: "",
            depositScheme: "",
        });

        setTableData([]);
    };

    return (
        <>
            <div className="apllicationContainer">
                <div className="CalculationOfInterest">
                    <div className="form-column">
                        <h2>Calculation Of Interest</h2>

                        <label htmlFor="date">Date of Application:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="voucher">Voucher Number:</label>
                        <input
                            type="number"
                            id="voucher"
                            name="voucher"
                            value={formData.voucher}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="depositScheme">Deposit Scheme:</label>
                        <select
                            id="depositScheme"
                            name="depositScheme"
                            value={formData.depositScheme || ""}
                            onChange={handleChange}
                            required={formData.depositScheme !== ""}
                        >
                            <option value="" disabled>
                                Select the Scheme
                            </option>
                            <option value="scheme1">Scheme 1</option>
                            <option value="scheme2">Scheme 2</option>
                            {/* Add more deposit schemes as needed */}
                        </select>

                        {/* Add download buttons */}
                        <div className="downloadButtons">
                            <button className="download" onClick={handleGenerateCSV}>
                                CSV
                            </button>
                            <button className="download" onClick={handleGenerateExcel}>
                                Excel
                            </button>
                            <button className="download" onClick={handleGeneratePdf}>
                                Pdf
                            </button>
                            <button className="download" onClick={handleCopyToClipboard}>
                                Copy
                            </button>
                            <button
                                className="download"
                                style={{ backgroundColor: "crimson", color: "aliceblue" }}
                                onClick={handleReset}
                            >
                                RESET
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Name of the Member</th>
                                    <th>Total Deposits</th>
                                    <th>Interest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.slNo}>
                                        <td>{row.slNo}</td>
                                        <td>{row.memberName}</td>
                                        <td>{row.totalDeposits}</td>
                                        <td>{row.interest}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="center-button">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default CalculationOfInterest;
