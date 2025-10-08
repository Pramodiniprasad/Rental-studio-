import React, { useState } from "react";
import "./Calendar.css";

function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const prevLastDay = new Date(currentYear, currentMonth, 0);

  const prevDays = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const days = [];
  // previous month days
  for (let i = prevDays; i > 0; i--) {
    days.push({ day: prevLastDay.getDate() - i + 1, type: "prev" });
  }
  // current month days
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, type: "current" });
  }
  // next month filler
  const nextDays = 42 - days.length;
  for (let i = 1; i <= nextDays; i++) {
    days.push({ day: i, type: "next" });
  }

  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="calendar-container">
    <div className="calendar-header">
      <div className="month-navigation">
        <button onClick={() => changeMonth(-1)}>‹</button>
        <h3>{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={() => changeMonth(1)}>›</button>
      </div>
    </div>
    
      <div className="calendar-grid">
        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}
        {days.map((d, i) => {
          const showMonthName = d.day === 1;
          return (
            <div key={i} className={`day ${d.type}`}>
              {showMonthName ? (
                <span className="month-label">
                  {monthNames[
                    d.type === "prev"
                      ? (currentMonth + 11) % 12
                      : d.type === "next"
                      ? (currentMonth + 1) % 12
                      : currentMonth
                  ]}{" "}
                  {d.day}
                </span>
              ) : (
                d.day
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
