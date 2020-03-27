import React from "react";
import "./css/Selector.css";

function Selector({
  day,
  month,
  year,
  months,
  monthChange,
  yearChange,
  handleGuide
}) {
  // Selector for months and years
  var nowYear = parseInt(new Date().getFullYear());

  return (
    <div id="cal-date">
      {/* Month Selector */}
      <select id="cal-mth" value={month} onChange={monthChange}>
        {months.map((e, i) => {
          return (
            <option key={i} value={i}>
              {e}
            </option>
          );
        })}
      </select>
      {/* Year Selector (nowYear - 10 to nowYear + 10) */}
      <select id="cal-yr" value={year} onChange={yearChange}>
        {[...Array(10)].map((e, i) => {
          return (
            <option key={nowYear - 10 + i} value={nowYear - 10 + i}>
              {nowYear - 10 + i}
            </option>
          );
        })}
        {[...Array(11)].map((e, i) => {
          return (
            <option key={nowYear + i} value={nowYear + i}>
              {nowYear + i}
            </option>
          );
        })}
      </select>
      {/* Guide to use the system */}
      <div id="guide">
        <button onClick={handleGuide}>Click here to open guide</button>
      </div>
      {/* Legend to help know the color terminology */}
      <div id="legend">
        <div className="holder">
          <div className="color reserve"></div>Reserved{" "}
        </div>
        <div className="holder">
          <div className="color select"></div>Vacant{" "}
        </div>
        <div className="holder">
          <div className="color fill"></div>Current Date{" "}
        </div>
      </div>
    </div>
  );
}

export default Selector;
