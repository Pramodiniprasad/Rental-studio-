// Return.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Return.css";

export default function Return() {
  const [filterType, setFilterType] = useState("Today");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [search, setSearch] = useState("");

  // Mock data (frontend-only)
  const mockData = [
    {
      name: "Arjun",
      mobile: "9876543210",
      alt: "9999999999",
      amount: 2000,
      deposit: 500,
      deposit_return_mode: "UPI",
    },
    {
      name: "Neha",
      mobile: "9123456789",
      alt: "9333333333",
      amount: 3000,
      deposit: 1000,
      deposit_return_mode: "Cash",
    },
    {
      name: "Ravi",
      mobile: "9988776655",
      alt: "9444444444",
      amount: 1500,
      deposit: 500,
      deposit_return_mode: "Bank Transfer",
    },
  ];

  // Filter logic — only applies search by mobile
  const filteredData = mockData.filter((item) =>
    item.mobile.includes(search.trim())
  );

  return (
    <div className="Return-page">
      <h2>Return</h2>

      {/* FILTER BAR */}
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option>Today</option>
          <option>Tomorrow</option>
          <option>Custom Date</option>
        </select>

        {filterType === "Custom Date" && (
          <>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              placeholderText="From date"
              className="date-input"
            />
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              placeholderText="To date"
              className="date-input"
            />
          </>
        )}

        <input
          type="text"
          placeholder="Search by mobile no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="Return-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Mobile No.</th>
              <th>Alternate No.</th>
              <th>Amount</th>
              <th>Deposit</th>
              <th>Deposit Return Mode</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.alt}</td>
                  <td>{item.amount}</td>
                  <td>{item.deposit}</td>
                  <td>{item.deposit_return_mode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
