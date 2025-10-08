import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Delivery.css";

export default function Delivery() {
  const [filterType, setFilterType] = useState("Today");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [search, setSearch] = useState("");

  // Mock data (frontend-only)
  const mockData = [
    { name: "Arjun", mobile: "9876543210", alt: "9999999999", amount: 2000, deposit: 500, remPay: 1500, mode: "Cash", date: new Date("2025-10-08") },
    { name: "Neha", mobile: "9123456789", alt: "9333333333", amount: 3000, deposit: 1000, remPay: 2000, mode: "UPI", date: new Date("2025-10-09") },
    { name: "Ravi", mobile: "9988776655", alt: "9444444444", amount: 1500, deposit: 500, remPay: 1000, mode: "Card", date: new Date("2025-10-10") },
  ];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Filter logic
  const filteredData = mockData.filter((item) => {
    let dateMatch = true;

    // Normalize item date to remove time
    const itemDate = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());

    if (filterType === "Today") {
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      dateMatch = itemDate.getTime() === todayDate.getTime();
    } else if (filterType === "Tomorrow") {
      const tomorrowDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
      dateMatch = itemDate.getTime() === tomorrowDate.getTime();
    } else if (filterType === "Custom Date") {
      if (fromDate && toDate) {
        const from = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        const to = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
        dateMatch = itemDate >= from && itemDate <= to;
      } else if (fromDate) {
        const from = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        dateMatch = itemDate.getTime() === from.getTime();
      }
    }

    const searchMatch = item.mobile.includes(search);
    return dateMatch && searchMatch;
  });


  return (
    <div className="delivery-page">
      <h2>Delivery</h2>

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
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mobile No.</th>
            <th>Alternate No.</th>
            <th>Amount</th>
            <th>Deposit</th>
            <th>Rem. Payment</th>
            <th>Rem. Payment Mode</th>
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
                <td>{item.remPay}</td>
                <td>{item.mode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
