import React from "react";
import "./css/Message.css";

export function Message({ message }) {
  // To display Error and Success messages
  return (
    <div id="message" className={message.class}>
      <h4>{message.text}</h4>
    </div>
  );
}
