import React from "react";
import "./css/Calendar.css";
import Tooltip from "../utils/Tooltip";

function Days({ data, squares, check, day, now, nowDate }) {
  // Using the calculations of days in month, render the days accordingly

  // (Number of squares / 7) to determine rows in month
  // Loop through rows and create days with tooltips
  return (
    <tbody>
      {[...Array(squares.length / 7)].map((e, j) => {
        return (
          <tr className="day">
            {squares.slice(7 * j, 7 * (j + 1)).map((s, i) => {
              return s === "b" ? (
                <td className="blank"></td>
              ) : (
                <td
                  key={s}
                  className={
                    // check if the date is current date
                    nowDate === s && now
                      ? s === day
                        ? "active now"
                        : "now"
                      : ""
                  }
                  onClick={e => check(e, s)}
                >
                  <div className={data[s] ? "dd filled" : "dd"}>
                    {/* <!-- [TOOLTIP] --> */}
                    <Tooltip
                      message={data[s] ? data[s] : "Not filled"}
                      position={"top"}
                    >
                      {s}
                    </Tooltip>
                  </div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default Days;
