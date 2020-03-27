import React, { useState } from "react";
import "./css/Events.css";

function Events({
  data,
  day,
  sMonth,
  month,
  year,
  handleSubmit,
  handleDelete,
  close
}) {
  // Add/Edit Tenant Events

  let date = day + " " + month + " " + year;

  // State variables
  const [name, setName] = useState(data[day]);
  const [dialogFlag, setDialogFlag] = useState(false);

  // Datetime to UNIX conversion
  const dateToUnix = (y, m, d) => {
    return (new Date(Date.UTC(y, m, d, 0, 0, 0)).getTime() / 1000).toFixed(0);
  };

  // To check if the user selected previous date.

  let previous =
    +(new Date().getTime() / 1000).toFixed(0) - +dateToUnix(year, sMonth, day);

  // To handle show/hide of the dialog
  const handleDialog = () => {
    setDialogFlag(true);
  };

  return (
    <div>
      {/* DIALOG */}
      {/* Show dialog based on flag*/}
      {dialogFlag ? (
        <div id="dialog-screen">
          <div id="dialog">
            <h3>Are you sure?</h3>
            {data[day] ? (
              <input
                type="button"
                value="Yes"
                onClick={e => handleDelete(e, day, name)}
              />
            ) : (
              <input
                type="button"
                value="Yes"
                onClick={e => handleSubmit(e, day, name)}
              />
            )}
            <input type="button" value="No" onClick={close} />
          </div>
        </div>
      ) : (
        // Main event fragment
        // Handles both add and delete events
        <React.Fragment>
          <div id="cover"></div>
          <div id="cal-event">
            <form>
              {previous > 86400 ? (
                <h5 style={{ color: "red" }}>
                  You are trying to select a previous date!
                </h5>
              ) : null}
              <h4>{data[day] ? "EDIT" : "ADD"} TENANT</h4>
              <h4>Stay Date : {date}</h4>
              {data[day] ? (
                <h3>Name of Tenant : {name}</h3>
              ) : (
                <textarea
                  id="evt-details"
                  placeholder="Enter name of Tenant"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                ></textarea>
              )}
              <input type="button" value="Close" onClick={close} />
              {data[day] ? (
                <input type="button" value="Delete" onClick={handleDialog} />
              ) : (
                <input
                  type="button"
                  name={name}
                  value="Save"
                  className={name ? "" : "disabled"}
                  onClick={handleDialog}
                />
              )}
            </form>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Events;
