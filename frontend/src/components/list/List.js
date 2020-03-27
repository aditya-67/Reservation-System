import React, { useState, useEffect } from "react";
import { Message } from "../utils/Message";
import "./css/List.css";

export function List({ month, monthNames, year, data }) {
  // State Varibales
  const [tabFlag, setTabFlag] = useState(true); // Falg to show tabs
  const [allData, setAllData] = useState([]); // Data of all tenants
  const [message, setMessage] = useState(null); // Flag for message

  // Component mount call
  useEffect(() => {
    fetchData(); // fetch data from API on load
  }, [data]);

  // Calculate vacancies
  var daysInMth = new Date(year, monthNames.indexOf(month) + 1, 0).getDate();
  var vacancies = daysInMth - Object.keys(data).length;

  // Handle show/hide of tabs
  const openTab = (e, tab) => {
    if (tab === "month") {
      setTabFlag(true);
    }
    if (tab === "all") {
      setTabFlag(false);
    }
  };

  // Unix timestamp to Datetime conversion

  const unixToDate = timeStamp => {
    let date = new Date(timeStamp * 1000);
    return date;
  };

  // Datetime to Unix timestamp conversion

  const dateToUnix = (y, m, d) => {
    return (new Date(Date.UTC(y, m, d, 11, 0, 0)).getTime() / 1000).toFixed(0);
  };

  // GET Request (/reserve/[startTime]/[endTime])
  // All data from 2010 to 2030

  const fetchData = () => {
    var unixStart = dateToUnix(2010, 0, 1);
    var unixEnd = dateToUnix(2030, 12, 0);

    console.log(unixStart);
    console.log(unixEnd);

    let url = "http://localhost:3000/reserve/" + unixStart + "/" + unixEnd;
    fetch(url)
      .then(res => {
        if (res.ok) {
          res.json().then(resJson => {
            // handle success
            let results = {},
              temp = [];
            for (let i of resJson["reserved"]) {
              results = {};
              let date = unixToDate(i["time"]);
              results["name"] = i["tennantName"];
              results["time"] = i["time"];
              results["day"] = date.getDate();
              results["month"] = monthNames[date.getMonth()];
              results["year"] = date.getFullYear();
              temp.push(results);
            }
            setAllData(temp.sort((a, b) => a["time"] - b["time"]));
          });
        } else if (res.status === 400) {
          res.text().then(text => {
            // handle 400 series errors
            setMessage({ class: "error", text: "Error : " + text });
            const timer = setTimeout(() => {
              setMessage(null);
            }, 20000);
            return () => clearTimeout(timer);
          });
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        setMessage({
          // handle request errors
          class: "error",
          text: "Something went wrong! Please reload"
        });
        // const timer = setTimeout(() => {
        //   setMessage(null);
        // }, 20000);
        // return () => clearTimeout(timer);
      });
  };

  // Render tabs of month and all tenants data using state variables

  return (
    <div className="tenants">
      <div className="tab">
        <button
          className={tabFlag ? "tablinks active" : "tablinks"}
          onClick={e => openTab(e, "month")}
        >
          Tenants in {month}, {year}
        </button>
        <button
          className={tabFlag ? "tablinks" : "tablinks active"}
          onClick={e => openTab(e, "all")}
        >
          All Tenants
        </button>
      </div>

      {tabFlag ? (
        <div className="vacancies">
          Number of vacancies in {month}, {year} : {vacancies}
        </div>
      ) : null}

      <table className="fixed_header">
        <thead>
          <tr>
            <th>Stay Date</th>
            <th>Name of Tenant</th>
          </tr>
        </thead>
        <tbody>
          {tabFlag ? (
            Object.keys(data).length === 0 ? (
              <tr style={{ textAlign: "center" }}>
                <td>No Data</td>
              </tr>
            ) : (
              Object.keys(data).map(k => {
                return (
                  <tr style={{ textAlign: "center" }}>
                    <td>
                      {k}-{month}-{year}
                    </td>
                    <td>{data[k]}</td>
                  </tr>
                );
              })
            )
          ) : allData.length === 0 ? (
            <tr style={{ textAlign: "center" }}>
              <td>No Data</td>
            </tr>
          ) : (
            allData.map(k => {
              return (
                <tr style={{ textAlign: "center" }}>
                  <td>
                    {k["day"]}-{k["month"]}-{k["year"]}
                  </td>
                  <td>{k["name"]}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* <!-- [MESSAGE] --> */}
      {message ? <Message message={message} /> : null}
    </div>
  );
}
