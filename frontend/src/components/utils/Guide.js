import React from "react";
import "./css/Guide.css";

function Guide({ closeGuide }) {
  // Guide to use the system
  return (
    <div id="guide-screen">
      <div class="notes">
        <h2 style={{ textAlign: "center" }}>Guide to use the system</h2>
        <h3>Calendar</h3>
        <p>
          Reserved dates and Vacant dates are colored according to the legend
          provided.
        </p>
        <p>
          Use the calendar to add/edit tenants. Click on the dates in the
          calendar to add or edit tenant.
        </p>
        <p>Hover over a date to display the name of tenant for that day.</p>
        <h3>List of Tenants</h3>
        <p>Find a table of list of tenants for the selected month/year.</p>
        <p>
          Click on All Tenants to show all reserved dates with name of tenants
          from 2010 to 2030.
        </p>
        <p>
          These lists will be updated as you add/delete a tenant using the
          calendar.
        </p>
        <button onClick={closeGuide}>Got It!</button>
      </div>
    </div>
  );
}

export default Guide;
