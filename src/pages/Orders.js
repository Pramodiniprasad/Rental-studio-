import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import "./Orders.css";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const orders = [
    {
      id: 2,
      bookingDate: "27/09/2025",
      customer: "Erer",
      mobile: "1234567890",
      alternate: "N/A",
      amount: 2000,
      deposit: 1000,
    },
    {
      id: 1,
      bookingDate: "25/09/2025",
      customer: "Erer",
      mobile: "1234567890",
      alternate: "N/A",
      amount: 2000,
      deposit: 3000,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.mobile.includes(search);
    const orderDate = new Date(order.bookingDate.split("/").reverse().join("-"));
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate =
      (!from || orderDate >= from) && (!to || orderDate <= to);
    return matchesSearch && matchesDate;
  });

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>

      <div className="order-filter-bar">
        <input
          type="text"
          placeholder="Search by mobile no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Booking Date</th>
              <th>Customer Name</th>
              <th>Mobile No.</th>
              <th>Alternate No.</th>
              <th>Amount</th>
              <th>Deposit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.bookingDate}</td>
                <td>{order.customer}</td>
                <td>{order.mobile}</td>
                <td>{order.alternate}</td>
                <td>₹{order.amount.toLocaleString()}</td>
                <td className="deposit">₹{order.deposit.toLocaleString()}</td>
                <td>
                  <FiEye
                    className="view-icon"
                    onClick={() => navigate(`/orders/${order.id}/view`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
