import React from "react";
import "./css/Calendar.css";
import Days from "./Days";

function Calendar({ data, monday, month, year, check, day }) {
  // BASIC CALCULATIONS
  // Note - Jan is 0 & Dec is 11 in JS.
  // Note - Sun is 0 & Sat is 6

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //days of week

  // If week starts at monday, shift the days array
  if (monday) {
    days.push(days.shift());
  }

  let daysInMth = new Date(year, month + 1, 0).getDate(), // number of days in selected month
    startDay = new Date(year, month, 1).getDay(), // first day of the month
    endDay = new Date(year, month, daysInMth).getDay(); // last day of the month

  // Get current date, month, year

  let nowDate = new Date().getDate(),
    nowMonth = new Date().getMonth(),
    nowYear = new Date().getFullYear(),
    now = false;

  if (nowMonth === month && nowYear === year) {
    now = true;
  }

  // DRAWING CALCULATIONS
  // Determine the number of blank squares before start of month
  let squares = [];
  if (monday && startDay !== 1) {
    let blanks = startDay === 0 ? 7 : startDay;
    for (let i = 1; i < blanks; i++) {
      squares.push("b");
    }
  }
  if (!monday && startDay !== 0) {
    for (let i = 0; i < startDay; i++) {
      squares.push("b");
    }
  }

  // Populate the days of the month
  for (let i = 1; i <= daysInMth; i++) {
    squares.push(i);
  }

  // Determine the number of blank squares after end of month
  if (monday && endDay !== 0) {
    let blanks = endDay === 6 ? 1 : 7 - endDay;
    for (let i = 0; i < blanks; i++) {
      squares.push("b");
    }
  }
  if (!monday && endDay !== 6) {
    let blanks = endDay === 0 ? 6 : 6 - endDay;
    for (let i = 0; i < blanks; i++) {
      squares.push("b");
    }
  }

  return (
    <div id="cal-container">
      <table id="calendar">
        <thead>
          <tr className="head">
            {days.map(d => {
              return <td>{d}</td>;
            })}
          </tr>
        </thead>
        {/* <!-- [DAYS] --> */}
        <Days
          data={data}
          squares={squares}
          check={check}
          day={day}
          now={now}
          nowDate={nowDate}
        />
      </table>
    </div>
  );
}

export default Calendar;
