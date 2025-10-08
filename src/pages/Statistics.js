import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Statistics.css";

export default function Statistics() {
  const [filter, setFilter] = useState("Last Month");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Dummy data with date for filtering
  const dummyData = [
    { week: "31 Aug - 06 Sept", revenue: 0, bookings: 0, date: new Date("2025-09-03") },
    { week: "07 Sept - 13 Sept", revenue: 0, bookings: 0, date: new Date("2025-09-10") },
    { week: "14 Sept - 20 Sept", revenue: 500, bookings: 1, date: new Date("2025-09-17") },
    { week: "21 Sept - 27 Sept", revenue: 3000, bookings: 2, date: new Date("2025-09-24") },
    { week: "28 Sept - 04 Oct", revenue: 0, bookings: 0, date: new Date("2025-10-02") },
  ];

  // Filtering logic
  useEffect(() => {
    let data = [];

    const today = new Date();

    if (filter === "Today") {
      data = dummyData.filter(
        (item) => item.date.toDateString() === today.toDateString()
      );
    } else if (filter === "Last Week") {
      // Get last 7 days
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      data = dummyData.filter((item) => item.date >= weekAgo && item.date <= today);
    } else if (filter === "Last Month") {
      // Get last 30 days
      const monthAgo = new Date();
      monthAgo.setDate(today.getDate() - 30);
      data = dummyData.filter((item) => item.date >= monthAgo && item.date <= today);
    } else if (filter === "Custom Date" && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      data = dummyData.filter((item) => item.date >= from && item.date <= to);
    } else {
      data = dummyData;
    }

    setFilteredData(data);
  }, [filter, fromDate, toDate]);

  // Compute totals dynamically
  const totalBookings = filteredData.reduce((sum, item) => sum + item.bookings, 0);
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
  const revenueInCash = totalRevenue * 0.33; // mock 1/3 cash
  const revenueInBank = totalRevenue - revenueInCash;

  return (
    <div className="page-container">
      {/* Header with filter on right */}
      <div className="header-bar">
        <h2 className="page-title">Statistics</h2>

        <div className="filter-bar">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Today</option>
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Custom Date</option>
          </select>

          {filter === "Custom Date" && (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Booking</h3>
          <p>{totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue In Cash</h3>
          <p>{revenueInCash.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue In Bank</h3>
          <p>{revenueInBank.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Booking Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={filteredData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
