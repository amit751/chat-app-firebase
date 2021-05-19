import React from "react";
import "../style/message.css";
export default function Message({ message, user }) {
  console.log(message.createdAt);
  const formatDate = (message) => {
    let result = "";
    const d = new Date(message.createdAt);
    console.log(d);
    result +=
      d.getFullYear() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      (d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes());
    return result;
  };
  return (
    <div className="message-component">
      <div>
        <span>
          <div>
            <img src={message.userImg}></img>
          </div>
          {message.userName}
        </span>
        <span>{message.content}</span>
      </div>
      <div>time : {formatDate(message)}</div>
    </div>
  );
}

//desc +sort
// login with google +facebook
