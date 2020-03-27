import React, { useState } from "react";
import "./css/Tooltip.css";

function Tooltip(props) {
  // To show name of tenant on hover of date

  // State variables
  const [display, setDisplay] = useState(false);

  // To handle hiding of tooltip
  const hideTooltip = () => {
    setDisplay(false);
  };
  // To handle showing of tooltip
  const showTooltip = () => {
    setDisplay(true);
  };

  return (
    <span className="tooltip" onMouseLeave={hideTooltip}>
      {display && (
        <div className={`tooltip-bubble tooltip-${props.position}`}>
          <div className="tooltip-message">{props.message}</div>
        </div>
      )}
      <span className="tooltip-trigger" onMouseOver={showTooltip}>
        {props.children}
      </span>
    </span>
  );
}

export default Tooltip;
