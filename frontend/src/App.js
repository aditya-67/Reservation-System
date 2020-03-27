import React, { useState, useEffect } from "react";
import Selector from "./components/calendar/Selector";
import Calendar from "./components/calendar/Calendar";
import Events from "./components/list/Events";
import { List } from "./components/list/List";
import { Message } from "./components/utils/Message";
import Loader from "./components/utils/Loader";
import Guide from "./components/utils/Guide";
import "./App.css";

function App() {
  // [PROPERTIES]
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const api = "http://localhost:3000"; // API endpoint
  const monday = false; // Week starts at Monday

  // [STATE VARIBALES]
  const [sDay, setDay] = useState(-1); // date
  const [sMonth, setMonth] = useState(new Date().getMonth()); // month
  const [sYear, setYear] = useState(parseInt(new Date().getFullYear())); // year
  const [eventFlag, setEventFlag] = useState(false); // flag to show/hide events
  const [data, setData] = useState({}); // data
  const [message, setMessage] = useState(null); // display messages
  const [loadFlag, setLoadFlag] = useState(true); // flag to show/hide loading
  const [guideFlag, setGuideFlag] = useState(false); // flag to show/hide guide

  // [FUNCTIONS]

  // Unix timestamp to Date conversion
  const unixToDate = timeStamp => {
    let date = new Date(timeStamp * 1000);
    return date.getDate();
  };

  // Datetime to Unix timestamp conversion
  const dateToUnix = (y, m, d) => {
    return (new Date(Date.UTC(y, m, d, 11, 0, 0)).getTime() / 1000).toFixed(0);
  };

  // Component mount call
  useEffect(() => {
    fetchData();
  }, [sMonth, sYear]);

  // T0 handle change of month
  const monthChange = e => {
    setData({});
    setMonth(+e.target.value);
    close();
  };

  // To handle change of year
  const yearChange = e => {
    setData({});
    setYear(+e.target.value);
    close();
  };

  // To check the selected day
  const check = (e, s) => {
    setDay(s);
    setEventFlag(true);
  };

  // To close the displayed dialogs
  const close = () => {
    setDay(-1);
    setEventFlag(false);
    setData(data);
  };

  // To handle display of guide
  const handleGuide = () => {
    setGuideFlag(true);
  };

  // To handle closing of guide
  const closeGuide = () => {
    setGuideFlag(false);
  };

  // Fetch data from API (start time, end time)
  // GET Request (/reserve/[startTime]/[endTime])
  const fetchData = () => {
    setLoadFlag(true);
    var unixStart = dateToUnix(sYear, sMonth, 1);
    var unixEnd = dateToUnix(sYear, sMonth + 1, 0);

    let url = api + "/reserve/" + unixStart + "/" + unixEnd;
    fetch(url)
      .then(res => {
        if (res.ok) {
          res.json().then(resJson => {
            setLoadFlag(false);
            let results = {};
            for (let i of resJson["reserved"]) {
              results[unixToDate(i["time"])] = i["tennantName"];
            }
            setData(results);
          });
        } else if (res.status === 400) {
          res.text().then(text => {
            // Handling 400 series errors
            setMessage({ class: "error", text: "Error : " + text });
            const timer = setTimeout(() => {
              setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
          });
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        setMessage({
          // Handling request errors
          class: "error",
          text: "Something went wrong! Please reload"
        });
        //   const timer = setTimeout(() => {
        //     setMessage(null);
        //   }, 2000);
        //   return () => clearTimeout(timer);
      });
  };

  // To add a tenant to a date
  // POST Request (/reserve)

  const handleSubmit = (e, day, name) => {
    setLoadFlag(true);
    let payload = {};
    let url = api + "/reserve";

    // Body of request
    payload["tennantName"] = name;
    payload["time"] = +dateToUnix(sYear, sMonth, day);
    payload["reserved"] = true;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          res.json().then(() => {
            // Handling success
            setLoadFlag(false);
            setData({ ...data, [day]: payload["tennantName"] });
            setDay(-1);
            setEventFlag(false);
            setMessage({ class: "success", text: "Saved Successfully" });
            const timer = setTimeout(() => {
              setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
          });
        }
        if (res.status === 400) {
          res.text().then(text => {
            // Handling 400 series errors
            setLoadFlag(false);
            setDay(-1);
            setEventFlag(false);
            setMessage({ class: "error", text: "Error : " + text });
            const timer = setTimeout(() => {
              setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
          });
        }
      })
      .catch(error => {
        setMessage({
          // Handling request errors
          class: "error",
          text: "Something went wrong! Please reload"
        });
        //   const timer = setTimeout(() => {
        //     setMessage(null);
        //   }, 2000);
        //   return () => clearTimeout(timer);
      });
  };

  // To delete a tenant from a date
  // POST Request (/reserve)

  const handleDelete = (e, day, text) => {
    setLoadFlag(true);
    let payload = {};
    let url = api + "/reserve";

    // Body of Request
    payload["tennantName"] = text;
    payload["time"] = +dateToUnix(sYear, sMonth, day);
    payload["reserved"] = false;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          res.json().then(() => {
            // Handling success
            setLoadFlag(false);
            const { [day]: name, ...rest } = data;
            setData(rest);
            setDay(-1);
            setEventFlag(false);
            setMessage({ class: "success", text: "Deleted Successfully" });
            const timer = setTimeout(() => {
              setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
          });
        }
        if (res.status === 400) {
          res.text().then(text => {
            // Handling 400 series errors
            setLoadFlag(false);
            setDay(-1);
            setEventFlag(false);
            setMessage({ class: "error", text: "Error : " + text });
            const timer = setTimeout(() => {
              setMessage(null);
            }, 2000);
            return () => clearTimeout(timer);
          });
        }
      })
      .catch(error => {
        setMessage({
          // Handling request errors
          class: "error",
          text: "Something went wrong! Please reload"
        });
        // const timer = setTimeout(() => {
        //   setMessage(null);
        // }, 2000);
        // return () => clearTimeout(timer);
      });
  };

  // Components Rendering

  return (
    <div className="App">
      {/* <!-- [LOADER] --> */}
      {loadFlag ? <Loader /> : null}
      <h2 className="heading">Reservation System</h2>
      <div id="wrapper">
        <div id="main">
          {/* <!-- [PERIOD SELECTOR] --> */}
          <Selector
            month={sMonth}
            year={sYear}
            months={monthNames}
            monthChange={monthChange}
            yearChange={yearChange}
            handleGuide={handleGuide}
          />

          {/* <!-- [CALENDAR] --> */}
          <Calendar
            data={data}
            monday={monday}
            month={sMonth}
            year={sYear}
            check={check}
            day={sDay}
          />

          {/* <!-- [EVENT] --> */}
          {eventFlag ? (
            <Events
              data={data}
              day={sDay}
              month={monthNames[sMonth]}
              sMonth={sMonth}
              year={sYear}
              handleSubmit={handleSubmit}
              close={close}
              handleDelete={handleDelete}
            />
          ) : null}
        </div>
        <div id="list">
          {/* <!-- [LIST] --> */}
          <List
            data={data}
            monthNames={monthNames}
            month={monthNames[sMonth]}
            year={sYear}
          />
        </div>
      </div>
      {/* <!-- [MESSAGE] --> */}
      {message ? <Message message={message} /> : null}

      {/* <!-- [GUIDE] --> */}
      {guideFlag ? <Guide closeGuide={closeGuide} /> : null}
    </div>
  );
}

export default App;
